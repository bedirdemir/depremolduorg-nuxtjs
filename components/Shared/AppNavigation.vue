<template>
  <nav class="border-b border-gray-300 bg-[#FCFFE760] lg:bg-inherit">
    <ul class="flex space-x-4 py-1 lg:py-2 justify-center">
        <li>
          <NuxtLink to='/' class="pb-1 lg:pb-2 hover:text-primary transition-all text-sm lg:text-base" active-class="text-primary border-b-2 border-primary">
		        Son Depremler
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to='/map' class="pb-1 lg:pb-2 hover:text-primary transition-all text-sm lg:text-base" active-class="text-primary border-b-2 border-primary">
		        Deprem Haritası
	        </NuxtLink>
        </li>
        <li>
          <NuxtLink to='/inform' class="pb-1 lg:pb-2 hover:text-primary transition-all text-sm lg:text-base" active-class="text-primary border-b-2 border-primary">
		        Bilgilendirme
	        </NuxtLink>
        </li>
    </ul>
  </nav>
</template>