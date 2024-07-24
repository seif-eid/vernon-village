<script lang="ts">
	import type { ContentModel } from '$lib/server/interfaces'
	import type { WithId, Document } from 'mongodb'
	import { goto } from '$app/navigation'
	export let contentModel: ContentModel
	export let mongoDocument: Map<string, any>
	const content = mongoDocument.get('content');
	async function deleteItem() {
    // Ask for confirmation
    const confirmed = confirm("Are you sure you want to delete this item?");
    
    // If user confirms
    if (confirmed) {
        try {
            const formData = new FormData();
            formData.append('id', mongoDocument.get('_id'));
            formData.append('name', contentModel.name);

            // Send deletion request
            const response = await fetch('?/deleteContent', {
                method: 'POST',
                body: formData
            });

            // Check response status
            if (response.ok) {
                // Notify user about successful deletion
                alert('Item deleted successfully.');
                
                // Optionally reload the page or update UI
                window.location.reload(); // Example: reloads the current page
            } else {
                // Handle non-successful response
                alert('Failed to delete item.');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('An error occurred while deleting the item.');
        }
    } else {
        // User canceled deletion, do nothing
        console.log('Deletion canceled by user.');
    }
}


</script>
<div id={contentModel._id} class="card">
	<div class="card-header">
        <div class="btn-group">
            <!-- TODO: Implement edit -->
				<button on:click="{function() {window.location.href = '/admin/edit/'+contentModel.htmlName+"?id="+mongoDocument.get('_id')+"&name="+contentModel.name}}" 
					class="btn btn-success" type="button">Edit</button>
			<!-- TODO: Implement delete -->
			<form method="POST" action="?/deleteContent" on:submit|preventDefault>
				<input type="hidden" name="id" value={mongoDocument.get('_id')} class="form-control">
				<input type="hidden" name="name" value={contentModel.name} class="form-control">
				<button class="btn btn-danger" type="submit" on:click={deleteItem}>Delete</button>
			</form>
			
        </div>
	</div>
	<div class="card-body">
        {#each contentModel.fields as field}

			{#if content[field.name] && field.name == 'image'}
				<img src={content[field.name]} alt={content['imagdesc']} width="500" height="auto">
            {:else if content[field.name] && field.name !== 'password'}
				<p>{field.displayName}: {content[field.name]}</p>

			{/if}
        {/each}
    </div>
</div>


