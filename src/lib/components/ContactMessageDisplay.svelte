<script lang="ts">
    export let cardBodyId: string = '';
    export let subject: string = '';
    export let message: string = '';
    export let phone: string = '';
    export let email: string = '';
	async function deleteItem() {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (confirmed) {
        try {
            const formData = new FormData();
            formData.append('cardBodyId', cardBodyId);
            formData.append('subject', subject);
            formData.append('message', message);
            formData.append('phone', phone);
            formData.append('email', email);

            const response = await fetch('/deleteContent', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                alert('Item deleted successfully.');
                // Reload the page
                window.location.reload();
            } else {
                alert('Failed to delete item.');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('An error occurred while deleting the item.');
        }
    }
}

</script>


<div class="card">
	<div class="card-header">
		<button
			class="btn btn-secondary"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#A{cardBodyId}"
		>
			{subject}
		</button>
	</div>
	<div id="A{cardBodyId}" class="collapse card-body">
		{message}
	</div>
	<div class="card-footer">
		<ul class="nav nav-pills nav-justified">
			<a class="nav-link" href="tel:+{phone}">{phone}</a>
			<a class="nav-link" href="mailto:{email}">{email}</a>

            <!-- TODO: Implement Delete -->
			<form method="POST" action="/deleteContent">
				<input type="hidden" name="cardBodyId" value={cardBodyId} class="form-control">
				<input type="hidden" name="subject" value={subject} class="form-control">
				<input type="hidden" name="message" value={message} class="form-control">
				<input type="hidden" name="phone" value={phone} class="form-control">
				<input type="hidden" name="email" value={email} class="form-control">
				<button class="btn btn-danger" type="button" on:click={() => deleteItem()}>Delete</button>
			</form>
		</ul>
	</div>
</div>
