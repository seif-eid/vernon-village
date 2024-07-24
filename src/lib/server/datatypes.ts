import type { SysDataType } from '$server/interfaces';

/**
 * The datatypes used for content input/display.
 * 
 * These datatypes are the form input html datatypes,
 * as all data should be modifiable using forms.
 */
export const contentDataTypes: Array<SysDataType> = [
    { name: "text" },
    { name: "image" },
    { name: "file" },
    { name: "email" },
    { name: "url" },
    { name: "date" },
    { name: "time" },
    { name: "datetime-local" }
]