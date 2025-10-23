import React, { FC } from 'react';
import { Box, Button, Icon, Text } from 'zmp-ui';

export const QuantityPicker: FC<{
  value: number;
  onChange: (quantity: number) => void;
}> = ({ value, onChange }) => {
  return (
    <Box flex className="border border-[#e9ebed] rounded-full p-[6px]">
      <Button
        disabled={value < 1}
        onClick={() => onChange(value - 1)}
        variant="secondary"
        type="neutral"
        icon={
          <div className="py-3 px-1">
            <div className="w-full h-[2px] bg-black" />
          </div>
        }
      />
      <Box flex justifyContent="center" alignItems="center" className="flex-1">
        <Text size="large" className="font-medium text-zinc-500">
          Số lượng:
        </Text>
        <div
          className="w-14 h-10 flex items-center justify-center border border-[#6a6e72] rounded-lg bg-white text-lg font-semibold"
          style={{ margin: '0 8px' }}
        >
          {value}
        </div>
      </Box>
      <Button
        onClick={() => onChange(value + 1)}
        variant="secondary"
        type="neutral"
        icon={<Icon icon="zi-plus" />}
      />
    </Box>
  );
};
