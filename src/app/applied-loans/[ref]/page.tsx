import LoanDetailClient from "./LoanDetailClient";

type Props = {
    params: Promise<{ ref: string }>;
};

export default async function AppliedLoanDetailPage({ params }: Props) {
    const { ref } = await params;
    return <LoanDetailClient applicationRef={decodeURIComponent(ref)} />;
}
