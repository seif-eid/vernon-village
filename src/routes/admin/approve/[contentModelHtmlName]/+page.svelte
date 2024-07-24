<script lang="ts">
	import ContentApprovalCard from "$lib/components/ContentApprovalCard.svelte";
    import type { ContentModel } from "$lib/server/interfaces";

    export let data: { 
        activeContentModel: ContentModel, 
        mongoDocuments: Map<string, any>[]
    }
</script>

<div class="container">
    <br>
    {#if data.mongoDocuments.length == 0}
    <h4>No {data.activeContentModel.name} community content is pending approval</h4>
    {/if}
    {#each data.mongoDocuments as mongoDocument}
    <ContentApprovalCard contentModel={data.activeContentModel} mongoDocument={mongoDocument} />
    {/each}
</div>