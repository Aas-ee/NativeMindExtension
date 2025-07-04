import { defineAppConfig } from 'wxt/utils/define-app-config'

// Define types for your config
declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    theme?: 'light' | 'dark'
  }
}

export default defineAppConfig({
  theme: 'light',
})
