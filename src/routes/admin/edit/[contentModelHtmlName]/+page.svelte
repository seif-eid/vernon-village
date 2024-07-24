<script lang="ts">
	import EditContentFormCard from '$lib/components/contentModel/EditContentFormCard.svelte';
	import type { ContentModel } from '$lib/server/interfaces';



	// access data from parent layout
	export let data;
</script>
<svelte:head>
  <title>Edit Community Content!</title>
</svelte:head>
<h2>Edit Community Content!</h2>
<EditContentFormCard contentModel={data.activeContentModel} fields={data.fields}/>