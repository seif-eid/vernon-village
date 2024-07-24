<script lang="ts">
	import ContentFormCard from "$lib/components/contentModel/ContentFormCard.svelte";
	import type { ContentModel } from "$lib/server/interfaces";


    export let data: { contactFormModel: ContentModel }
</script>
<svelte:head>
  <title>Contact Us</title>
</svelte:head>

<div class="container">
    <h2>Contact Us!</h2>
    <ContentFormCard contentModel={data.contactFormModel} />
</div>