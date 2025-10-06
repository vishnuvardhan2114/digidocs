import React from 'react'
import {Label} from "ui/components/ui/label";
import {Input} from "ui/components/ui/input";
import {cn} from "ui/lib/utils";
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { FieldError } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form';

type FormInputProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    label: string;
    placeholder: string;
    type?: string;
    register: UseFormRegister<T>;
    error?: FieldError;
    validation?: RegisterOptions<T>;
    disabled?: boolean;
    value?: string;
};


const InputField = <T extends FieldValues = FieldValues>({ name, label, placeholder, type = "text", register, error, validation, disabled, value }: FormInputProps<T>) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="text-sm font-medium text-gray-800">
                {label}
            </Label>
            <Input
                type={type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                className={cn('h-14 px-3 py-3 text-[#171717] text-base placeholder:text-gray-500 border-2 border-[#171717] bg-gray-50 rounded-lg focus:!border-[#a54df1] focus:ring-0', { 'opacity-50 cursor-not-allowed': disabled })}
                {...register(name as Path<T>, validation)}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    )
}
export default InputField