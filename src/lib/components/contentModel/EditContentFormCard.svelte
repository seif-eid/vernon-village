<script lang="ts">
	import type { ContentModel } from "$lib/server/interfaces";
    import ContentModelForm from "./EditContentForm.svelte";
	
    export let contentModel: ContentModel
	export let fields: any;
</script>

<div class="card">
	<div class="card-body">
        <h3 class="card-title">{contentModel.name}</h3>
		<ContentModelForm contentModel={contentModel} fields={fields}/>
	</div>
</div>