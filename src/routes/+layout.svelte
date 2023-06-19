<script lang="ts">
	import '../styles/global.scss';
	import { setContext } from 'svelte';
	import { browser } from "$app/environment";
	import __ from '$lib/locales';
	import Profile from '$lib/profile';
	import Header from '$components/layout/Header.svelte';


	/**
	* Profile
	* ==================================================
	*/
	const profile = new Profile();
	const { userTheme } = profile;
	setContext('profile', profile);

	// ui theme
  $: if (browser) document.documentElement.setAttribute('theme', $userTheme);

	



	/*
	 * [DEV] clear console on Hot Module Reload
	*/
	if (import.meta.hot) {
		import.meta.hot.on(
			"vite:beforeUpdate",
			/* eslint-disable-next-line no-console */
			() => console.clear()
		);
	}
</script>



<Header />
<slot></slot>
