<script lang="ts">
	import type { ContentModel } from '$lib/server/interfaces'
	import type { WithId, Document } from 'mongodb'

	export let contentModel: ContentModel
	export let mongoDocument: Map<string, any>
	const content = mongoDocument.get('content');
</script>

<div class="card">
	<div class="card-header">
        <div class="btn-group">
            <!-- TODO: Implement approve -->
			<form method="POST" action="?/approveContent">
				<input type="hidden" name="id" value={mongoDocument.get('_id')} class="form-control">
				<input type="hidden" name="name" value={contentModel.name} class="form-control">
				<button class="btn btn-success" type="submit">Approve</button>
			</form>
			<!-- TODO: Implement reject -->
			<form method="POST" action="?/rejectContent">
				<input type="hidden" name="id" value={mongoDocument.get('_id')} class="form-control">
				<input type="hidden" name="name" value={contentModel.name} class="form-control">
				<button class="btn btn-danger" type="submit">Reject</button>
			</form>
        </div>
	</div>
	<div class="card-body">
        {#each contentModel.fields as field}
			{#if content[field.name] && field.name == 'image'}
				<img src={content[field.name]} alt={content['imagdesc']} width="500" height="auto">
			{:else}
            	<p>{field.displayName}: {content[field.name]}</p>
            {/if}
        {/each}
    </div>
</div>

