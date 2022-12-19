import { EffectCallback, useEffect } from "react";

const CONFIG = {
    awsKey: "AKIAJCJRVV7KDOE56BRA",
    awsUrl: "//s3-us-west-2.amazonaws.com",
    awsBucket: "test.static.a.viar.live",
    apiUrl: "https://api.wix.viar.live/api/v1/",
    storageUrl: "https://ddn1wrsew90bv.cloudfront.net",
    embedUrl: "https://wix.viar.live/embed",
    appUrl: "https://wix.viar.live",
    krpanoUrl: "https://viar-4538.kxcdn.com/viewer/wix4",
    buildNumber: "1626332496",
    auth0ClientId: "B7tDv5YaGY4Y0rFU8nnVIZmCz1kaNjGF",
    token:
        "Viarlive eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ3aXh8NGQwY2YwODUtYTJhNC00Yjg1LTg5MTYtNDAxMjQ5N2FmZWFmIiwiYXVkIjoiQjd0RHY1WWFHWTRZMHJGVThublZJWm1DejFrYU5qR0YiLCJ1c2VyX2lkIjoid2l4fDRkMGNmMDg1LWEyYTQtNGI4NS04OTE2LTQwMTI0OTdhZmVhZiIsImlzcyI6Imh0dHBzOi8vbGlzdDNkLmF1dGgwLmNvbS8iLCJleHAiOjE2MzM2Mjc1NzQsImlhdCI6MTYzMzU5MTU3NH0.J0XrCv5FnKmXwD_1Dzpwmjb3V6PwxkIj1JZOT7HnTIy1O1tk2COumUGyvJVCsOKi5h2kQNduUGqN-lJDc6obZFVVTLiJxDetApLV1-uRrCr58ZTpLW9h8flBerxxl9OzkmtkPx79I9_UBkG84xOzdZVaxH1OiG4BYn414Y3H9Yy1jlFGdFiyNmQ0cfbr27linzz6U7k3XPWwbPr0G-U3uKCoYTE7t3jZpTI43xqyTVwWXMefuOpMkJGLyVudfnaeCZOod1cqdt1UVCqnZv4GcCsOth6H1EjgZPeqSnc0xuk7n8t_yr_KlCqZxlMXOv_z6yYlrIIZToWG9EULtNMD8w",
    client: "wix",
    facebookAppId: "361224084210512",
    userType: "DEMO",
    subscriptionPlan: {
        id: "DEMO",
        name: "Demo",
        tourLimit: 2147483647,
        sphereLimitPerTour: 2147483647,
        features: [ "FLOOR_PLAN", "ECOMMERCE" ],
    },
};

export const VIEWER_CONFIG = {
    SCRIPT_PATH: `${CONFIG.krpanoUrl}/tour.js`,
    SETTINGS_PATH: `${CONFIG.krpanoUrl}/skin/vtourskin.xml`,
    TARGET_ID: 'main-pano',
    SECOND_TARGET_ID: 'second-pano',
    MAIN_VIEWER_ID: 'main-viewer-id',
    SECOND_VIEWER_ID: 'second-viewer-id',
};

const krpanoScript = document.createElement('script');

krpanoScript.setAttribute('src', VIEWER_CONFIG.SCRIPT_PATH);

document.head.appendChild(krpanoScript);

export type KrpanoPos = { x: number; y: number };

export type Krpano = {
    set: (variable: string, val: any) => void;
    get: (variable: string) => string;
    call: (action: string) => void;
    spheretoscreen: (h: number, v: number) => KrpanoPos;
    screentosphere: (x: number, y: number) => KrpanoPos;
};

type EmbedPanoParams = {
    target: string;
    id?: string;
    xml?: string;
    basepath?: string;
    html5?: string;
    vars?: Record<any, any>;
    initvars?: Record<any, any>;
    consolelog?: boolean;
    onready?: (krpano: Krpano) => void;
};

declare global {
    interface Window {
        embedpano: (params: EmbedPanoParams) => void;
        removepano: (id: string) => void;
    }
}

export const embedPano = (overrides?: Partial<EmbedPanoParams>): void => {
    window.embedpano({
        xml: VIEWER_CONFIG.SETTINGS_PATH,
        target: VIEWER_CONFIG.TARGET_ID,
        id: VIEWER_CONFIG.MAIN_VIEWER_ID,
        html5: 'only',
        basepath: `${CONFIG.krpanoUrl}/`,
        ...overrides,
    });
};

export const useMountEffect = (effect: EffectCallback): void => useEffect(effect, []);

export const removePano = (id = VIEWER_CONFIG.MAIN_VIEWER_ID): void => {
    window.removepano(id);
};