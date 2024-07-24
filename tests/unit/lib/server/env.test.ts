import { describe, it, expect, test } from 'vitest';

import { SYS_MODELS, SYS_DATATYPES, MONGO_URL, MONGO_DB } from '$env/static/private'


describe("Environment variables are present", () => {
    test("that the MONGO_URL variable is loaded", () => {
        expect(MONGO_URL).toBeTruthy()
    })

    test("that the MONGO_DB variable is loaded", () => {
        expect(MONGO_DB).toBeTruthy()
    })

    test("that the SYS_MODELS variable is loaded", () => {
        expect(SYS_MODELS).toBeTruthy()
    })

    test("that the SYS_DATATYPES variable is loaded", () => {
        expect(SYS_DATATYPES).toBeTruthy()
    })
})

