<script lang="ts">
	import '../styles/global.scss';
	import { setContext } from 'svelte';
	import { browser } from "$app/environment";
	import Profile from '$lib/profile';
	import MainNav from '$components/layout/MainNav.svelte';
	import TopBar from '$components/layout/TopBar.svelte';
	
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


<div class="wrapper container contained">
	<MainNav />
	<div class="content">
		<TopBar />
		<main>
			<slot></slot>
		</main>
	</div>
</div>


<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-columns: 12rem 1fr;
		gap: 2rem;
	}	
	main {
		margin: 2em 0;
	}
</style>

