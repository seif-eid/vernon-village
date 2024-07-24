<script>
	export let businessName = '';
	export let description = '';
	export let image = '';
	export let imagedesc = '';
	export let link = '';
	export let phone = '';
	export let email = '';
</script>

<div class="col mx-auto">
	<article class="post text-center">
		<h2 class="post-title">{businessName}</h2>
		{#if image != ""}
			<img src="{image}" style="display:{image !== "" ? "block" : "none"}" alt={imagedesc}>
		{/if}
		<p class="lead fw-normal text-muted mb-3">{description}</p>
		<h4 class="post-subtitle">Contact Info</h4>
		<p class="lead fw-normal text-muted mb-4">
			Phone Number:<br/>
			{phone}<br/>
			Email:<br/>
			<a href="{email}">{email}</a><br/>
		</p>
	</article>
	<hr />
</div>