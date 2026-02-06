import React from 'react'

const page = () => {
    
    return (
        <main className="min-h-screen bg-background">
            <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-10">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cta/20 blur-3xl" />
                </div>
                <div className="container relative z-10 mx-auto px-4">
                    <div className="rounded-2xl border border-primary-foreground/10 bg-card/10 backdrop-blur p-6 text-center">
                        <div className="text-primary-foreground">this is personal page</div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default page
