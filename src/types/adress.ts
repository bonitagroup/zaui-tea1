export type SavedAddress = {
    id: string;
    name: string;
    phone: string;
    provinceId?: string;
    districtId?: string;
    wardId?: string;
    street?: string;
    isDefault?: boolean;
};