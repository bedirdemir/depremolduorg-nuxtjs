<template>
  <nav class="sticky top-0 border-b border-gray-300 backdrop-blur-2xl bg-white/75">
    <ul class="flex space-x-4 py-3 justify-center">
      <li>
        <NuxtLink to="/" class="pb-3 hover:text-primary transition-all text-sm font-medium lg:text-base" active-class="text-primary border-b-4 border-primary"> Son Depremler </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/map" class="pb-3 hover:text-primary transition-all text-sm font-medium lg:text-base" active-class="text-primary border-b-4 border-primary"> Deprem Haritası </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/inform" class="pb-3 hover:text-primary transition-all text-sm font-medium lg:text-base" active-class="text-primary border-b-4 border-primary"> Bilgilendirme </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
