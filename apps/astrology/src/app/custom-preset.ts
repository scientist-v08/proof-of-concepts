// custom-preset.ts
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export default definePreset(Aura, {
    semantic: {
        primary: {
            500: '#32bfbd',
        },
    },
});
