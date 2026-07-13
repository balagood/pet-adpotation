import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMeetRequest,
  getAdopterRequests,
  getShelterRequests,
  getAvailableSlots,
  updateMeetStatus,
} from "../api/meetGreetService";

// CREATE request
export const addMeetRequest = createAsyncThunk(
  "meetGreet/add",
  async (data) => {
    const res = await createMeetRequest(data);
    return res;
  }
);

// GET adopter requests
/* export const fetchAdopterRequests = createAsyncThunk(
  "meetGreet/adopter",
  async (id) => {
    const res = await getAdopterRequests();
    return res;
  }
); */

export const fetchAdopterRequests = createAsyncThunk(
  "meetGreet/adopter",
  async () => {
    const res = await getAdopterRequests();
    return res;
  }
);

export const fetchAvailableSlots = createAsyncThunk(
  "meetGreet/slots",
  async ({ shelterId, meetingDate }) => {
    const res = await getAvailableSlots(shelterId, meetingDate);
    return res;
  }
);
// GET shelter requests
/* export const fetchShelterRequests = createAsyncThunk(
  "meetGreet/shelter",
  async (id) => {
    const res = await getShelterRequests();
    return res;
  }
); */

export const fetchShelterRequests = createAsyncThunk(
  "meetGreet/shelter",
  async () => {
    const res = await getShelterRequests();
    return res;
  }
);

// UPDATE status
/* export const changeMeetStatus = createAsyncThunk(
  "meetGreet/update",
  async (data) => {
    const res = await updateMeetStatus({id,data});
    return res;
  }
); */

/* export const changeMeetStatus = createAsyncThunk(
  "meetGreet/update",
  async ({ id, data }) => {
    const res = await updateMeetStatus(id, data);
    return res;
  }
); */

export const changeMeetStatus = createAsyncThunk(
  "meetGreet/update",
  async ({ id, status }) => {
    const res = await updateMeetStatus(id, { status });
    return res;
  }
);

const meetGreetSlice = createSlice({
  name: "meetGreet",
  initialState: {
    requests: [],
    availableSlots: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ADD REQUEST
      .addCase(addMeetRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMeetRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.push(action.payload.data || action.payload);
      })
      .addCase(addMeetRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADOPTER REQUESTS
      .addCase(fetchAdopterRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdopterRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.data || action.payload;
      })
      .addCase(fetchAdopterRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // SHELTER REQUESTS
      .addCase(fetchShelterRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShelterRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.data || action.payload;
      })
      .addCase(fetchShelterRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.availableSlots = action.payload.data || action.payload;
      })

      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE STATUS
      .addCase(changeMeetStatus.fulfilled, (state, action) => {
        const updated = action.payload.data || action.payload;

        state.requests = state.requests.map((item) =>
          item._id === updated._id ? updated : item
        );
      });
  },
});

export default meetGreetSlice.reducer;