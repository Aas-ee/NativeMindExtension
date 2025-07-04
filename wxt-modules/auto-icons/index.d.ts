import * as wxt from 'wxt'

declare const _default: wxt.WxtModule<AutoIconsOptions>

/**
 * Options for the auto-icons module
 */
interface AutoIconsOptions {
  /**
     * Enable auto-icons generation
     * @default true
     */
  enabled?: boolean
  /**
     * Path to the image to use.
     *
     * Path is relative to the project's src directory.
     * @default "<srcDir>/assets/icon.png"
     */
  baseIconPath?: string
  /**
     * Grayscale the image when in development mode to indicate development
     * @default true
     */
  grayscaleOnDevelopment?: boolean
  /**
     * Sizes to generate icons for
     * @default [128, 48, 32, 16]
     */
  sizes?: number[]
}
declare module 'wxt' {
  interface InlineConfig {
    autoIcons?: AutoIconsOptions
  }
}

export { type AutoIconsOptions, _default as default }
