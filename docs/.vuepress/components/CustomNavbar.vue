<script setup lang="ts">
//import NavbarBrand from '@vuepress/theme-default/lib/client/components/NavbarBrand.vue'
import NavbarBrand from './CustomNavbarBrand.vue'
import NavbarItems from '@vuepress/theme-default/lib/client/components/NavbarItems.vue'
import ToggleColorModeButton from '@vuepress/theme-default/lib/client/components/ToggleColorModeButton.vue'
import ToggleSidebarButton from '@vuepress/theme-default/lib/client/components/ToggleSidebarButton.vue'
import { computed, onMounted, ref } from 'vue'
import { useThemeLocaleData } from '@vuepress/theme-default/lib/client/composables/index.js'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import type { DefaultThemePageFrontmatter } from '@vuepress/theme-default/lib/shared/index.js'

defineEmits(['toggle-sidebar'])

const themeLocale = useThemeLocaleData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

const navbar = ref<HTMLElement | null>(null)
const navbarBrand = ref<HTMLElement | null>(null)

const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  }
})

// avoid overlapping of long title and long navbar links
onMounted(() => {
  // TODO: migrate to css var
  // refer to _variables.scss
  const MOBILE_DESKTOP_BREAKPOINT = 719
  const navbarHorizontalPadding =
    getCssValue(navbar.value, 'paddingLeft') +
    getCssValue(navbar.value, 'paddingRight')
  const handleLinksWrapWidth = (): void => {
    /*
    if (window.innerWidth < MOBILE_DESKTOP_BREAKPOINT) {
      linksWrapperMaxWidth.value = 0
    } else {
      linksWrapperMaxWidth.value =
        navbar.value!.offsetWidth -
        navbarHorizontalPadding -
        (navbarBrand.value?.offsetWidth || 0)
    }
    */
    linksWrapperMaxWidth.value =
        navbar.value!.offsetWidth -
        navbarHorizontalPadding -
        (navbarBrand.value?.offsetWidth || 0)
  }
  handleLinksWrapWidth()
  window.addEventListener('resize', handleLinksWrapWidth, false)
  window.addEventListener('orientationchange', handleLinksWrapWidth, false)
})

function getCssValue(el: HTMLElement | null, property: string): number {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[
    property
  ]
  const num = Number.parseInt(val, 10)
  return Number.isNaN(num) ? 0 : num
}
</script>

<template>
  <header ref="navbar" class="navbar">
    <ToggleSidebarButton  class="can-hide"  @toggle="$emit('toggle-sidebar')" />

    <span ref="navbarBrand"  v-show="!frontmatter.home">
      <NavbarBrand />
    </span>

    <div class="navbar-items-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      <NavbarItems/>
      <slot name="after" />
      <ToggleColorModeButton v-if="themeLocale.colorModeSwitch" />
      <NavbarSearch />
    </div>
  </header>
</template>