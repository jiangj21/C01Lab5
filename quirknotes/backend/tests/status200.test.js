test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});


// test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
//   const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const getAllNotesBody = await getAllNotesRes.json();
//   expect(getAllNotesRes.status).toBe(200);
//   expect(getAllNotesBody.response.length).toBe(0);
// });

// test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
//   const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const getAllNotesBody = await getAllNotesRes.json();
//   expect(getAllNotesRes.status).toBe(200);
//   expect(getAllNotesBody.response.length).toBe(2);
// });

test("/deleteNote - Delete a note", async () => {
  const title = "NoteTitleToDelete";
  const content = "NoteContentToDelete";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  
  const postNoteBody = await postNoteRes.json();
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody).toHaveProperty("insertedId");

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  expect(deleteNoteRes.status).toBe(200);
});

test("/patchNote - Patch with content and title", async () => {

  const title = "NoteTitleToUpdate";
  const content = "NoteContentToUpdate";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  const updatedTitle = "UpdatedTitle";
  const updatedContent = "UpdatedContent";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: updatedTitle,
      content: updatedContent,
    }),
  });

  expect(patchNoteRes.status).toBe(200);
});

test("/patchNote - Patch with just title", async () => {

  const title = "NoteTitleToUpdate";
  const content = "NoteContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const updatedTitle = "UpdatedTitle";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: updatedTitle,
    }),
  });

  expect(patchNoteRes.status).toBe(200);
});

test("/patchNote - Patch with just content", async () => {

  const title = "NoteTitle";
  const content = "NoteContentToUpdate"

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  const updatedContent = "UpdatedContent";

  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: updatedContent,
    }),
  });

  expect(patchNoteRes.status).toBe(200);
});

test("/deleteAllNotes - Delete one note", async () => {

  const title = "NoteTitleToDelete";
  const content = "NoteContentToDelete";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  // Delete all notes
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  expect(deleteAllNotesRes.status).toBe(200);
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  // Post three notes
  const title1 = "NoteTitleToDelete1";
  const content1 = "NoteContentToDelete1";
  
  const title2 = "NoteTitleToDelete2";
  const content2 = "NoteContentToDelete2";

  const title3 = "NoteTitleToDelete3";
  const content3 = "NoteContentToDelete3";

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title1,
      content: content1,
    }),
  });

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    }),
  });

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title3,
      content: content3,
    }),
  });

  // Delete all notes
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  expect(deleteAllNotesRes.status).toBe(200);

  // Fetch all notes to confirm they are deleted
  const getAllNotesAfterDeleteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getAllNotesAfterDeleteBody = await getAllNotesAfterDeleteRes.json();
  expect(getAllNotesAfterDeleteRes.status).toBe(200);
  expect(getAllNotesAfterDeleteBody.response.length).toBe(0);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  const title = "NoteTitleToUpdateColor";
  const content = "NoteContentToUpdateColor";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${postNoteBody.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color: "#FF0000",
    }),
  });

  expect(updateNoteColorRes.status).toBe(200);

});