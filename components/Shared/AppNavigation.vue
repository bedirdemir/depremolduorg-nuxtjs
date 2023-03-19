<template>
  <nav class="sticky top-0 border-b border-gray-300 backdrop-blur-2xl bg-white/75 py-1">
    <ul class="flex space-x-4 py-1 lg:py-2 justify-center">
      <li>
        <NuxtLink to="/" class="pb-1 lg:pb-2 hover:text-primary transition-all text-sm font-medium lg:text-base" active-class="text-primary border-b-4 border-primary"> Son Depremler </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/map" class="pb-1 lg:pb-2 hover:text-primary transition-all text-sm font-medium lg:text-base" active-class="text-primary border-b-4 border-primary"> Deprem Haritası </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/inform" class="pb-1 lg:pb-2 hover:text-primary transition-all text-sm font-medium lg:text-base" active-class="text-primary border-b-4 border-primary"> Bilgilendirme </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
