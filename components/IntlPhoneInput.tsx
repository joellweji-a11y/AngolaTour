
import React, { useState } from 'react';

interface Country {
    code: string;
    dial: string;
    flag: string;
    name: string;
}

const countries: Country[] = [
    { code: 'AO', dial: '+244', flag: '🇦🇴', name: 'Angola' },
    { code: 'PT', dial: '+351', flag: '🇵🇹', name: 'Portugal' },
    { code: 'BR', dial: '+55', flag: '🇧🇷', name: 'Brasil' },
    { code: 'MZ', dial: '+258', flag: '🇲🇿', name: 'Moçambique' },
    { code: 'CV', dial: '+238', flag: '🇨🇻', name: 'Cabo Verde' },
    { code: 'US', dial: '+1', flag: '🇺🇸', name: 'EUA' },
    { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'Reino Unido' },
    { code: 'FR', dial: '+33', flag: '🇫🇷', name: 'França' },
    { code: 'ES', dial: '+34', flag: '🇪🇸', name: 'Espanha' },
    { code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Alemanha' },
    { code: 'ZA', dial: '+27', flag: '🇿🇦', name: 'África do Sul' },
    { code: 'CN', dial: '+86', flag: '🇨🇳', name: 'China' },
    { code: 'RU', dial: '+7', flag: '🇷🇺', name: 'Rússia' },
    { code: 'AE', dial: '+971', flag: '🇦🇪', name: 'Emirados' },
];

interface IntlPhoneInputProps {
    value: string;
    onChange: (fullNumber: string) => void;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

const IntlPhoneInput: React.FC<IntlPhoneInputProps> = ({
    value,
    onChange,
    placeholder = '912 345 678',
    required = false,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // Angola default
    const [localNumber, setLocalNumber] = useState(value.replace(/^\+\d+\s?/, ''));

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        // Update full number with new country code
        onChange(`${country.dial}${localNumber.replace(/\s/g, '')}`);
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = e.target.value.replace(/[^0-9\s]/g, '');
        setLocalNumber(number);
        // Combine country code with number for international format
        onChange(`${selectedCountry.dial}${number.replace(/\s/g, '')}`);
    };

    return (
        <div className={`relative ${className}`}>
            <div className="flex bg-surface-dark dark:bg-surface-dark border border-white/10 dark:border-white/5 rounded-2xl overflow-hidden">
                {/* Country Selector Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-4 bg-background-dark/50 dark:bg-background-dark/50 border-r border-white/5 hover:bg-white/5 transition-all"
                >
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-400">{selectedCountry.dial}</span>
                    <span className="material-symbols-outlined text-sm text-gray-500">
                        {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                </button>

                {/* Phone Number Input */}
                <input
                    type="tel"
                    required={required}
                    value={localNumber}
                    onChange={handleNumberChange}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent py-4 px-4 text-white dark:text-white text-sm focus:outline-none placeholder:text-gray-600"
                />
            </div>

            {/* Country Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface-dark dark:bg-surface-dark border border-white/10 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
                    {countries.map((country) => (
                        <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all ${selectedCountry.code === country.code ? 'bg-primary/10 text-primary' : 'text-white'
                                }`}
                        >
                            <span className="text-xl">{country.flag}</span>
                            <span className="text-sm font-bold flex-1 text-left">{country.name}</span>
                            <span className="text-xs text-gray-500 font-mono">{country.dial}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IntlPhoneInput;
