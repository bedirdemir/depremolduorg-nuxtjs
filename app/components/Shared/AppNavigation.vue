<template>
  <nav class="sticky top-0 border-b border-gray-300 backdrop-blur-2xl bg-white/75">
    <ul class="flex space-x-5 py-2 justify-center">
      <li>
        <NuxtLink to="/" class="pb-2 hover:text-primary transition-all text-sm font-medium lg:text-base" active-class="text-primary border-b-[3px] border-primary">Son Depremler</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/map" class="pb-2 hover:text-primary transition-all text-sm font-medium lg:text-base" active-class="text-primary border-b-[3px] border-primary">Deprem Haritası</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/inform" class="pb-2 hover:text-primary transition-all text-sm font-medium lg:text-base" active-class="text-primary border-b-[3px] border-primary">Afet Bilinci</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
