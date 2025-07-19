import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { BRAND_INFOS, MAIN_BRAND } from '@/brands'
import { PAGE_CONFIGS } from '@/routes'
import { BRAND_SEO_CONFIGS } from '@/brands'

/**
 * 統一的當前品牌資訊管理
 */
export function useCurrentBrand() {
  const route = useRoute()

  // 當前品牌 key
  const brandKey = computed(() => route.meta?.brand || route.params?.brand || MAIN_BRAND)

  // 當前品牌資訊
  const brandInfo = computed(() => BRAND_INFOS[`${brandKey.value}Info` as keyof typeof BRAND_INFOS])

  // 當前品牌配置
  const brandConfig = computed(() => PAGE_CONFIGS[brandKey.value as keyof typeof PAGE_CONFIGS])

  // 當前品牌頁面配置
  const pageConfig = computed(() => PAGE_CONFIGS[brandKey.value as keyof typeof PAGE_CONFIGS])

  // 當前品牌 SEO 配置
  const seoConfig = computed(
    () => BRAND_SEO_CONFIGS[`${brandKey.value}SEO` as keyof typeof BRAND_SEO_CONFIGS],
  )

  // 是否為主品牌
  const isMainBrand = computed(() => brandKey.value === MAIN_BRAND)

  // 品牌首頁 URL
  const homepageUrl = computed(() => (isMainBrand.value ? '/' : `/${brandKey.value}`))

  // 品牌名稱相關
  const brandName = computed(() => brandInfo.value?.name || '品牌')
  const brandDisplayName = computed(() => brandInfo.value?.displayName || brandKey.value)
  const brandFullName = computed(() => brandInfo.value?.fullName || brandName.value)
  const brandShortName = computed(() => brandInfo.value?.shortName || brandName.value)

  // 品牌 Logo 相關
  const brandLogo = computed(() => brandInfo.value?.logo)
  const brandLogoDark = computed(() => brandInfo.value?.logoDark)
  const brandFavicon = computed(() => brandInfo.value?.favicon)
  const brandFaviconDark = computed(() => brandInfo.value?.faviconDark)

  // 品牌顏色相關
  const brandPrimaryColor = computed(() => brandInfo.value?.primaryColor)
  const brandSecondaryColor = computed(() => brandInfo.value?.secondaryColor)
  const brandAccentColor = computed(() => brandInfo.value?.accentColor)

  // 品牌聯絡資訊
  const brandContactEmail = computed(() => brandInfo.value?.contactEmail)
  const brandContactPhone = computed(() => brandInfo.value?.contactPhone)
  const brandContactAddress = computed(() => brandInfo.value?.contactAddress)
  const brandContactHours = computed(() => brandInfo.value?.contactHours)

  // 品牌社交媒體
  const brandSocial = computed(() => brandInfo.value?.social)

  // 品牌網站資訊
  const brandWebsiteUrl = computed(() => brandInfo.value?.websiteUrl)
  const brandSlogan = computed(() => brandInfo.value?.slogan)
  const brandEstablishedYear = computed(() => brandInfo.value?.establishedYear)

  // 品牌位置資訊
  const brandCountry = computed(() => brandInfo.value?.country)
  const brandCity = computed(() => brandInfo.value?.city)
  const brandState = computed(() => brandInfo.value?.state)
  const brandZipCode = computed(() => brandInfo.value?.zipCode)
  const brandLatitude = computed(() => brandInfo.value?.latitude)
  const brandLongitude = computed(() => brandInfo.value?.longitude)

  // 品牌政策相關
  const brandTermsOfService = computed(() => brandInfo.value?.termsOfService)
  const brandPrivacyPolicy = computed(() => brandInfo.value?.privacyPolicy)
  const brandCopyright = computed(() => brandInfo.value?.copyright)
  const brandCopyrightUrl = computed(() => brandInfo.value?.copyrightUrl)
  const brandReturnPolicy = computed(() => brandInfo.value?.returnPolicy)
  const brandExchangePolicy = computed(() => brandInfo.value?.exchangePolicy)
  const brandCancellationPolicy = computed(() => brandInfo.value?.cancellationPolicy)

  // 品牌支付和配送
  const brandPaymentMethods = computed(() => brandInfo.value?.paymentMethods)
  const brandDeliveryOptions = computed(() => brandInfo.value?.deliveryOptions)

  // 品牌時區和語言
  const brandTimezone = computed(() => brandInfo.value?.timezone)
  const brandLanguage = computed(() => brandInfo.value?.language)
  const brandCurrency = computed(() => brandInfo.value?.currency)

  return {
    // 基本資訊
    brandKey,
    brandInfo,
    brandConfig,
    pageConfig,
    seoConfig,
    isMainBrand,
    homepageUrl,

    // 品牌名稱
    brandName,
    brandDisplayName,
    brandFullName,
    brandShortName,

    // 品牌 Logo
    brandLogo,
    brandLogoDark,
    brandFavicon,
    brandFaviconDark,

    // 品牌顏色
    brandPrimaryColor,
    brandSecondaryColor,
    brandAccentColor,

    // 品牌聯絡資訊
    brandContactEmail,
    brandContactPhone,
    brandContactAddress,
    brandContactHours,

    // 品牌社交媒體
    brandSocial,

    // 品牌網站資訊
    brandWebsiteUrl,
    brandSlogan,
    brandEstablishedYear,

    // 品牌位置資訊
    brandCountry,
    brandCity,
    brandState,
    brandZipCode,
    brandLatitude,
    brandLongitude,

    // 品牌政策
    brandTermsOfService,
    brandPrivacyPolicy,
    brandCopyright,
    brandCopyrightUrl,
    brandReturnPolicy,
    brandExchangePolicy,
    brandCancellationPolicy,

    // 品牌支付和配送
    brandPaymentMethods,
    brandDeliveryOptions,

    // 品牌時區和語言
    brandTimezone,
    brandLanguage,
    brandCurrency,
  }
}
