export interface Voucher {
    id: string;
    title: string;
    amount: number; // amount to subtract (VND)
    description?: string;
}
