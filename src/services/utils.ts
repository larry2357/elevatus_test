export const beautifyDate = (date: string) => {
    const currentDate = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
    return currentDate.toLocaleDateString('en-us', options);
}

const LANGUAGE_PROFICIENCY: { [key: number]: string } = {
    0: "No Proficiency",
    1: "Elementary Proficiency",
    2: "Limited Working Proficiency",
    3: "Professional Working Proficiency",
    4: "Full Professional Proficiency",
    5: "Native / Bilingual Proficiency",
};

export const convertLanguages = (langs: { [key: string]: number; }[]): string[] => {
    const results: string[] = [];
    langs.forEach(lang => {
        Object.keys(lang).forEach((lang_id: string) => {
            results.push(`${lang_id.toUpperCase()} - ${LANGUAGE_PROFICIENCY[lang[lang_id]]}`);
        })
    })
    return results;
}