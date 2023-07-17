<script lang="ts">
	import '../styles/global.scss';
	import { setContext } from 'svelte';
	import { browser } from "$app/environment";
	import { NodeState } from '$lib/enums';
	import Profile from '$lib/profile';
	import MainNav from '$components/layout/MainNav.svelte';
	import TopBar from '$components/layout/TopBar.svelte';
	import status from '$lib/stores/status';
	import CatchingUp from '$components/blocks/status/CatchingUp.svelte';
	import Offline from '$components/blocks/status/Offline.svelte';
	
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
	* ==================================================
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
			
			{#if $status.state === NodeState.OFFLINE }
				<Offline />

			{:else if $status.state === NodeState.CATCHING_UP }
				<CatchingUp />
			
			{:else if $status.state === NodeState.READY }
				<slot></slot>

			{/if}
		
		
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

