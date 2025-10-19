import React, { FC, useEffect, useState } from "react";
import { Page, Header, Box, Text, Button, Icon } from "zmp-ui";
import { useNavigate } from "react-router";
import locations from "../../../mock/vietnam_locations.json";
import { SavedAddress } from "../../types/adress";



const LS_KEY = "addresses";

const resolveAddressText = (addr: SavedAddress) => {
    const provinces = locations as any[];
    const prov = provinces.find((p) => p.id === addr.provinceId);
    const dist = prov?.districts?.find((d: any) => d.id === addr.districtId);
    const ward = dist?.wards?.find((w: any) => w.id === addr.wardId);
    return `${addr.street || ""}${ward ? "" + ward.name : ""}${dist ? ", " + dist.name : ""}${prov ? ", " + prov.name : ""}`;
};

const AddressesPage: FC = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState<SavedAddress[]>([]);

    useEffect(() => {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) setAddresses(JSON.parse(raw));
    }, []);

    const setDefault = (id: string) => {
        const next = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
        localStorage.setItem(LS_KEY, JSON.stringify(next));
        setAddresses(next);
    };

    const goAdd = () => navigate("/cart/address");

    return (
        <Page>
            <Header title="Địa chỉ giao hàng" showBackIcon />
            <Box className="p-4 space-y-4">
                {addresses.length === 0 ? (
                    <Box className="bg-white rounded-2xl p-4 text-center">
                        <Text className="mb-3">Bạn chưa có địa chỉ nào.</Text>
                        <Button type="highlight" onClick={goAdd} fullWidth>
                            Thêm mới địa chỉ
                        </Button>
                    </Box>
                ) : (
                    <>
                        {addresses.map((a) => (
                            <Box
                                key={a.id}
                                className="bg-white rounded-xl p-4 flex items-start gap-3"
                                onClick={() => setDefault(a.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <Box className="w-8 h-8 rounded-full flex items-center justify-center bg-[#eaf6ef]">
                                    {a.isDefault ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M3 11.5L12 3l9 8.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" fill="#0a7a5b" />
                                        </svg>
                                    ) : (
                                        <div className="w-3 h-3 rounded-full bg-gray-300" />
                                    )}
                                </Box>
                                <Box className="flex-1">
                                    <Text className="font-semibold">{a.name} • {a.phone}</Text>
                                    <Text size="xSmall" className="text-gray">
                                        {resolveAddressText(a)}
                                    </Text>
                                </Box>
                                <Box className="ml-2">
                                    <Icon icon="zi-chevron-right" />
                                </Box>
                            </Box>
                        ))}

                        <div style={{ marginTop: 12 }}>
                            <Button fullWidth type="highlight" onClick={goAdd} style={{ borderRadius: 999 }}>
                                <Icon icon="zi-plus-circle" className="mr-2" />
                                Thêm mới địa chỉ
                            </Button>
                        </div>
                    </>
                )}
            </Box>
        </Page>
    );
};

export default AddressesPage;
