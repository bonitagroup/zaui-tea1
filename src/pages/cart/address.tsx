import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Page, Header, Box, Input, Button, Text, Switch, Icon } from "zmp-ui";
import { useNavigate } from "react-router";
import { getUserInfo, getPhoneNumber } from "zmp-sdk";
import locations from "../../../mock/vietnam_locations.json";

type LocationProvince = {
    id: string;
    name: string;
    districts: { id: string; name: string; wards: { id: string; name: string }[] }[];
};

type SavedAddress = {
    id: string;
    name: string;
    phone: string;
    provinceId?: string;
    districtId?: string;
    wardId?: string;
    street?: string;
    isDefault?: boolean;
};

const LS_KEY = "addresses";

const AddressPage: FC = () => {
    const navigate = useNavigate();
    const provinces = (locations as LocationProvince[]) || [];

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [provinceId, setProvinceId] = useState<string>();
    const [districtId, setDistrictId] = useState<string>();
    const [wardId, setWardId] = useState<string>();
    const [street, setStreet] = useState("");
    const [isDefault, setIsDefault] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const u = await getUserInfo({ autoRequestPermission: true }).catch(() => null);
                if (u?.userInfo?.name) setName(u.userInfo.name);
            } catch { }
            try {
                const p = await getPhoneNumber({ fail: () => { } }).catch(() => null);
                if (p?.number) setPhone(p.number);
            } catch { }
            try {
                const raw = localStorage.getItem(LS_KEY);
                if (raw) {
                    const savedList: SavedAddress[] = JSON.parse(raw);
                    const def = savedList.find((a) => a.isDefault);
                    if (def) {
                        setName(def.name || "");
                        setPhone(def.phone || "");
                        setProvinceId(def.provinceId);
                        setDistrictId(def.districtId);
                        setWardId(def.wardId);
                        setStreet(def.street || "");
                        setIsDefault(!!def.isDefault);
                    }
                }
            } catch { }
        })();
    }, []);

    const districts = useMemo(
        () => provinces.find((p) => p.id === provinceId)?.districts || [],
        [provinceId, provinces]
    );
    const wards = useMemo(
        () => districts.find((d) => d.id === districtId)?.wards || [],
        [districtId, districts]
    );

    const onSave = () => {
        const newAddr: SavedAddress = {
            id: Date.now().toString(),
            name,
            phone,
            provinceId,
            districtId,
            wardId,
            street,
            isDefault,
        };
        try {
            const raw = localStorage.getItem(LS_KEY);
            const list: SavedAddress[] = raw ? JSON.parse(raw) : [];
            if (newAddr.isDefault) {
                list.forEach((a) => (a.isDefault = false));
            }
            list.unshift(newAddr);
            localStorage.setItem(LS_KEY, JSON.stringify(list));
        } catch { }
        navigate("/cart/addresses");
    };

    const SelectBox = ({
        label,
        value,
        options,
        placeholder,
        onSelect,
        disabled,
    }: {
        label?: string;
        value?: string;
        options: { id: string; name: string }[];
        placeholder: string;
        onSelect: (id: string) => void;
        disabled?: boolean;
    }) => {
        const [show, setShow] = useState(false);
        const ref = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            const clickOutside = (e: MouseEvent) => {
                if (ref.current && !ref.current.contains(e.target as Node)) setShow(false);
            };
            document.addEventListener("click", clickOutside);
            return () => document.removeEventListener("click", clickOutside);
        }, []);

        return (
            <div className="mb-3 relative" ref={ref}>
                <button
                    type="button"
                    disabled={disabled}
                    className={`w-full flex items-center justify-between rounded-full px-4 py-3 bg-white text-left transition-all ${show ? "border-2 border-[#0a7a5b]" : "border border-[#E9EBED]"
                        } ${disabled ? "opacity-50" : ""}`}
                    onClick={() => setShow((s) => !s)}
                >
                    <span className="text-sm text-gray-700">
                        {options.find((o) => o.id === value)?.name || placeholder}
                    </span>
                    <Icon icon="zi-chevron-down" />
                </button>

                {show && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-2xl border border-gray-200 shadow-lg max-h-64 overflow-auto z-50">
                        {options.map((o) => (
                            <div
                                key={o.id}
                                className="px-5 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => {
                                    onSelect(o.id);
                                    setShow(false);
                                }}
                            >
                                {o.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <Page className="bg-[#f5f6f7] min-h-screen pb-32">
                <Header title="Địa chỉ mới" showBackIcon />

                <Box className="p-4 space-y-4">
                    <Box className="bg-white rounded-2xl p-4 shadow-sm">
                        <Text className="text-gray mb-2 font-medium">Liên hệ</Text>
                        <Input
                            value={name}
                            placeholder="Họ và tên"
                            onChange={(e: any) => setName(e.target.value)}
                            className="mb-3 rounded-full border border-[#E9EBED] px-4 py-3 text-sm"
                            clearable
                        />
                        <Input
                            value={phone}
                            placeholder="Số điện thoại"
                            onChange={(e: any) => setPhone(e.target.value)}
                            className="rounded-full border border-[#E9EBED] px-4 py-3 text-sm"
                            clearable
                        />
                    </Box>

                    <Box className="bg-white rounded-2xl p-4 shadow-sm">
                        <Text className="text-gray mb-3 font-medium">Địa chỉ</Text>

                        <SelectBox
                            placeholder="Tỉnh/thành phố"
                            options={provinces}
                            value={provinceId}
                            onSelect={(id) => {
                                setProvinceId(id);
                                setDistrictId(undefined);
                                setWardId(undefined);
                            }}
                        />
                        <SelectBox
                            placeholder="Quận/huyện"
                            options={districts}
                            value={districtId}
                            onSelect={(id) => {
                                setDistrictId(id);
                                setWardId(undefined);
                            }}
                            disabled={!provinceId}
                        />
                        <SelectBox
                            placeholder="Phường/Xã"
                            options={wards}
                            value={wardId}
                            onSelect={(id) => setWardId(id)}
                            disabled={!districtId}
                        />
                        <Input
                            value={street}
                            placeholder="Tên đường, Tòa nhà, Số nhà"
                            onChange={(e: any) => setStreet(e.target.value)}
                            className="rounded-full border border-[#E9EBED] px-4 py-3 text-sm"
                        />
                    </Box>

                    <Box className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
                        <div>
                            <Text className="font-medium">Địa chỉ mặc định</Text>
                            <Text size="xSmall" className="text-gray">
                                Lưu địa chỉ này cho lần đặt tiếp theo
                            </Text>
                        </div>
                        <Switch checked={isDefault} onChange={(v: any) => setIsDefault(!!v)} />
                    </Box>
                </Box>
            </Page>

            <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] z-50 pb-20">
                <Button
                    fullWidth
                    type="highlight"
                    className="rounded-full h-12 font-semibold text-white text-base"
                    style={{
                        background: "linear-gradient(90deg,#055140,#0a7a5b)",
                    }}
                    onClick={onSave}
                >
                    <Icon icon="zi-plus-circle" className="mr-2" />
                    Hoàn thành
                </Button>
            </div>
        </>
    );
};

export default AddressPage;
