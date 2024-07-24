<script lang="ts">
    import { goto } from "$app/navigation";
    import { selectedImage } from "../../../imageStore";
    import type { PageData, ActionData } from "./$types";
    export let data;
    export let form: ActionData;
    $: ({ bulletinPost } = data);

    async function deleteAnimation(index: number) {
        let recordEl = document.getElementById(`record-${index}`);
        if (recordEl) {
            recordEl.style.backgroundColor = "#f44336"; // Set background color to red
            recordEl.style.transition =
                "transform 0.5s ease-out, opacity 0.5s ease-out, background-color 0.5s ease-out";
            recordEl.style.opacity = "0";
            recordEl.style.transform = "translateX(-100%)";
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
    }

    function viewImageDetail(image: any) {
        selectedImage.set(image); // Set the selected image filename in the store
        goto("/site/image-detail");
    }
</script>

<div class="container">
    <h2>Vernon Village Admin Portal - Edit Content</h2>
    <hr />
    <h3>Currently active posts</h3>
    <p>Below is a list of the currently active bulletin board posts.</p>
    <br />

    {#each bulletinPost as bp, index (bp)}
        <form method="POST">
            <div class="record" id={`record-${index}`}>
                <input type="text" name="id" value={bp._id} hidden />
                <div class="record-content">
                    <div class="record-item">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <img
                            src={bp.content.image}
                            alt="Poster"
                            on:click={() =>
                            viewImageDetail({
                                imageFilename: bp.content.image,
                                imageDesc: bp.content.imagedesc,
                                imageDetailDesc: bp.content.description,
                                imageEndDate: bp.content.expiryDate,
                                imageContactInfo: bp.content.email
                            })}
                        />
                    </div>
                    <div class="record-item header">{bp.content.imagedesc}</div>
                    <div class="record-item date">
                        Creation Date<br />{bp.content.date}
                    </div>
                    <div class="record-item date">
                        Expiry Date<br />{bp.content.expiryDate}
                    </div>
                    <div class="record-item buttons">
                        <button
                            class="reject"
                            on:click={() => deleteAnimation(index)}
                            >Delete</button
                        >
                    </div>
                </div>
                <details class="expandable">
                    <summary>More Info</summary>
                    <p>{bp.content.description}</p>
                    <p>
                        Contact Information:
                        <a href="mailto:{bp.content.email}"
                            >{bp.content.email}</a
                        >
                    </p>
                </details>
            </div>
        </form>
    {/each}
</div>

<style>
    .record {
        border: 1px solid #ddd;
        border-radius: 10px;
        margin-bottom: 15px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        background-color: white;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        opacity: 1;
        transform: translateX(0);
        transition: background-color 0.5s ease-out;
    }
    .record-content {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
    }
    .record-item {
        border: 1px solid #aaa;
        padding: 10px;
        margin: 5px;
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: #f9f9f9;
    }
    .record img {
        max-width: 100%;
        max-height: 100px;
    }
    .record .header {
        font-size: 20px;
        font-weight: bold;
    }
    .record .date {
        font-size: 14px;
        color: #666;
    }
    .record-item.buttons {
        flex-direction: row;
        justify-content: space-between;
    }
    .record .reject {
        flex: 1;
        margin: 0 5px;
        border-radius: 5px; /* Add this line */
        font-weight: bold;
        color: white;
        border: none; /* Add this line to remove default border */
        padding: 10px; /* Add this line to increase button size and make it more clickable */
    }
    .record .reject {
        background-color: #f44336; /* Red */
    }
</style>
