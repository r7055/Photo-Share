// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

// // Types
// export interface AIImageState {
//   isGenerating: boolean
//   generatedImageUrl: string | null
//   error: string | null
//   isModalOpen: boolean
// }

// // Async thunk for generating image
// export const generateImage = createAsyncThunk("aiImage/generateImage", async (prompt: string, { rejectWithValue }) => {
//   try {
//     const response = await fetch("/api/Ai/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ prompt }),
//     })

//     if (!response.ok) {
//       const errorData = await response.json()
//       throw new Error(errorData.error || "Failed to generate image")
//     }

//     const imageUrl = await response.text()
//     return imageUrl.replace(/"/g, "") // Remove quotes if present
//   } catch (error) {
//     return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
//   }
// })

// // Initial state
// const initialState: AIImageState = {
//   isGenerating: false,
//   generatedImageUrl: null,
//   error: null,
//   isModalOpen: false,
// }

// // Slice
// const aiImageSlice = createSlice({
//   name: "aiImage",
//   initialState,
//   reducers: {
//     openModal: (state) => {
//       state.isModalOpen = true
//       state.error = null
//     },
//     closeModal: (state) => {
//       state.isModalOpen = false
//       state.generatedImageUrl = null
//       state.error = null
//     },
//     clearError: (state) => {
//       state.error = null
//     },
//     clearGeneratedImage: (state) => {
//       state.generatedImageUrl = null
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(generateImage.pending, (state) => {
//         state.isGenerating = true
//         state.error = null
//         state.generatedImageUrl = null
//       })
//       .addCase(generateImage.fulfilled, (state, action: PayloadAction<string>) => {
//         state.isGenerating = false
//         state.generatedImageUrl = action.payload
//         state.error = null
//       })
//       .addCase(generateImage.rejected, (state, action) => {
//         state.isGenerating = false
//         state.error = action.payload as string
//         state.generatedImageUrl = null
//       })
//   },
// })

// export const { openModal, closeModal, clearError, clearGeneratedImage } = aiImageSlice.actions
// export default aiImageSlice.reducer
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

// Types
export interface AIImageState {
  isGenerating: boolean
  generatedImageUrl: string | null
  error: string | null
  isModalOpen: boolean
}

// Async thunk for generating image
export const generateImage = createAsyncThunk(
  "aiImage/generateImage", 
  async (prompt: string, { rejectWithValue }) => {
    try {
      const apiUrl = import.meta.env.REACT_APP_API_URL;
      console.log("API URL:", apiUrl); // Debugging line to check the API URL
      if (!apiUrl) {
        throw new Error("REACT_APP_API_URL environment variable is not defined");
      }
      const response = await fetch(apiUrl + '/Ai/generate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate image")
      }

      // Since your controller returns Ok(imageUrl), the response is just the URL string
      const imageUrl = await response.text()
      
      // Clean up the URL (remove quotes if they exist due to JSON serialization)
      return imageUrl.replace(/^"|"$/g, "").trim()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error")
    }
  }
)

// Initial state
const initialState: AIImageState = {
  isGenerating: false,
  generatedImageUrl: null,
  error: null,
  isModalOpen: false,
}

// Slice
const aiImageSlice = createSlice({
  name: "aiImage",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true
      state.error = null
    },
    closeModal: (state) => {
      state.isModalOpen = false
      state.generatedImageUrl = null
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    clearGeneratedImage: (state) => {
      state.generatedImageUrl = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateImage.pending, (state) => {
        state.isGenerating = true
        state.error = null
        state.generatedImageUrl = null
      })
      .addCase(generateImage.fulfilled, (state, action: PayloadAction<string>) => {
        state.isGenerating = false
        state.generatedImageUrl = action.payload
        state.error = null
      })
      .addCase(generateImage.rejected, (state, action) => {
        state.isGenerating = false
        state.error = action.payload as string
        state.generatedImageUrl = null
      })
  },
})

export const { openModal, closeModal, clearError, clearGeneratedImage } = aiImageSlice.actions
export default aiImageSlice.reducer