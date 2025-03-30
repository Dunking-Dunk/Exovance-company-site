import { ChromeShader } from '../components/canva/ChromeShader'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            chromeShader: any
        }
    }
} 