<script>
	/**
	 * @type {{ photos: any[]; }}
	 */
	export let data;

	let currentPhotoIndex = 0;

	// Check if data is defined and has photos array
	$: photos = data && data.photos ? data.photos : [];

	function goToPreviousPhoto() {
		currentPhotoIndex =
			(currentPhotoIndex - 1 + photos.length) % photos.length;
	}

	function goToNextPhoto() {
		currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
	}
</script>

<body>
	<div class="container">
		<h2>Welcome to Vernon Village, Ontario</h2>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
			ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
			aliquip ex ea commodo consequat. Duis aute irure dolor in
			reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
			pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
			culpa qui officia deserunt mollit anim id est laborum.
		</p>

		<h3>About the Vernon Community Association</h3>
		<p>
			This website is sponsored by ipsum dolor sit amet, consectetur
			adipiscing elit, sed do eiusmod tempor incididunt ut labore et
			dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
			exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit
			esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
			cupidatat non proident, sunt in culpa qui officia deserunt mollit
			anim id est laborum.
		</p>

		<h3>Vernon Village Photos</h3>

		<!-- Ensure photos array is defined before rendering -->
		{#if photos.length > 0}
			<div class="text-center">
				<img
					class="img-fluid rounded"
					src={photos[currentPhotoIndex].image}
					alt={photos[currentPhotoIndex].imagedesc}
				/>
			</div>

			<div class="btn-group">
				<button class="btn btn-primary" on:click={goToPreviousPhoto}>
					Previous
				</button>
				<button class="btn btn-primary" on:click={goToNextPhoto}>
					Next
				</button>
			</div>
		{:else}
			<p>No photos available.</p>
		{/if}
	</div>
</body>

<style>
	body {
		color: rgb(18, 18, 18) a0a;
		margin: 0;
		padding: 0;
		/* background-image: url("/src/routes/1711573841275.jpg"); */
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed; /* Keeps the background image fixed */
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		/* color: rgb(162, 19, 19) a0a; */
		/* background-color: rgba(255, 255, 255, 0.9); */
		/* border-radius: 10px; */
		/* box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); */
		/* backdrop-filter: blur(10px); */
	}

	h2,
	h3 {
		font-family: Arial, sans-serif;
		color: rgb(18, 18, 18) a0a;
		text-align: center;
		margin-bottom: 1rem;
	}

	p {
		font-family: Arial, sans-serif;
		color: rgb(18, 18, 18) a0a;
		text-align: justify;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.img-fluid {
		max-width: 100%;
		height: auto;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease-in-out;
	}

	.img-fluid:hover {
		transform: scale(1.05);
	}

	.btn-primary {
		background-color: #0c3042;
		color: white;
		border: none;
		padding: 10px 20px;
		font-size: 1rem;
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 0.3s ease-in-out;
	}

	.btn-primary:hover {
		background-color: #0056b3;
	}

	.btn-group {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 1.5rem;
	}
</style>