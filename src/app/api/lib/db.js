import mongoose from "mongoose";

const globalWithMongoose = global;
const cached = globalWithMongoose.__mongoose || { conn: null, promise: null };

async function dropIndexSafe(collection, indexName) {
    try {
        await collection.dropIndex(indexName);
        return true;
    } catch {
        return false;
    }
}

/** Removes legacy unique index on personalEmail so users can submit multiple salaried applications. */
export async function dropSalariedPersonalEmailUniqueIndex(connOrConnection) {
    const db =
        connOrConnection?.connection?.db ||
        connOrConnection?.db ||
        mongoose.connection?.db;
    if (!db) return false;

    let dropped = false;
    const collectionNames = ["borrowersalariedloans", "borrowerborrowersalariedloans"];

    for (const name of collectionNames) {
        try {
            const collection = db.collection(name);
            const indexes = await collection.indexes();
            for (const idx of indexes) {
                const keys = idx?.key ? Object.keys(idx.key) : [];
                const isPersonalEmailOnly =
                    keys.length === 1 && keys[0] === "personalEmail" && idx.unique === true;
                if (isPersonalEmailOnly && idx.name) {
                    if (await dropIndexSafe(collection, idx.name)) dropped = true;
                }
            }
        } catch {
            // Collection may not exist under this name.
        }
    }

    if (!dropped) {
        for (const name of collectionNames) {
            if (await dropIndexSafe(db.collection(name), "personalEmail_1")) {
                dropped = true;
            }
        }
    }

    return dropped;
}

async function salariedPersonalEmailIndexIsUnique(connOrConnection) {
    const db =
        connOrConnection?.connection?.db ||
        connOrConnection?.db ||
        mongoose.connection?.db;
    if (!db) return false;

    for (const name of ["borrowersalariedloans", "borrowerborrowersalariedloans"]) {
        try {
            const indexes = await db.collection(name).indexes();
            for (const idx of indexes) {
                const keys = idx?.key ? Object.keys(idx.key) : [];
                if (keys.length === 1 && keys[0] === "personalEmail" && idx.unique === true) {
                    return true;
                }
            }
        } catch {
            // try next collection name
        }
    }
    return false;
}

async function runLegacyIndexMaintenance(conn) {
    if (!globalWithMongoose.__businessLoanEmailIndexDropped) {
        globalWithMongoose.__businessLoanEmailIndexDropped = true;
        await dropIndexSafe(conn.connection.db.collection("borrowerbusinessloans"), "personalEmail_1");
    }

    if (!globalWithMongoose.__salariedEmailIndexOk) {
        if (!(await salariedPersonalEmailIndexIsUnique(conn))) {
            globalWithMongoose.__salariedEmailIndexOk = true;
        } else {
            await dropSalariedPersonalEmailUniqueIndex(conn);
            if (!(await salariedPersonalEmailIndexIsUnique(conn))) {
                globalWithMongoose.__salariedEmailIndexOk = true;
            }
        }
    }

    if (!globalWithMongoose.__googleFormLegacyIndexDropped) {
        globalWithMongoose.__googleFormLegacyIndexDropped = true;
        await dropIndexSafe(conn.connection.db.collection("googleforms"), "category_1");
    }
}

function getMongoUri() {
    const uri = String(process.env.CONNECTIONSTRING || "").trim();
    if (!uri) {
        throw new Error("Missing CONNECTIONSTRING environment variable");
    }
    return uri;
}

const connectDB = async () => {
    const uri = getMongoUri();

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(uri, {
                bufferCommands: false,
                serverSelectionTimeoutMS: 15000,
                socketTimeoutMS: 45000,
                maxPoolSize: 10,
            })
            .then((mongooseInstance) => mongooseInstance);
    }

    try {
        if (!cached.conn) {
            cached.conn = await cached.promise;
        }

        await runLegacyIndexMaintenance(cached.conn);

        globalWithMongoose.__mongoose = cached;
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        cached.conn = null;
        throw error;
    }
};

export default connectDB;
