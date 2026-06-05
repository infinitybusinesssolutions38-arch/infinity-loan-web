import AppliedLoanEditClient from "./AppliedLoanEditClient";

type Props = {
    params: Promise<{ ref: string }>;
};

export default async function AppliedLoanEditPage({ params }: Props) {
    const { ref } = await params;
    return <AppliedLoanEditClient applicationRef={decodeURIComponent(ref)} />;
}
