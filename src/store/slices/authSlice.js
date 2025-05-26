import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  client,
  postLogin,
  getRegistration,
  postRegistration,
  postRecovery,
  postReset,
  postSetup,
} from "@/api";
import { trackMarketingEvent, marketingEvents } from "@/marketing";
import { track, events } from "@/metrics";
import generateId from "@/utils/generateId";

const onReject = (state, action) => {
  const { code, msg: message } = action.payload || {};

  state.isLoading = false;
  state.error = { code, message, id: generateId() };
};

export const login = createAsyncThunk(
  "authSlice/login",
  async ({ userLogin, password }, thunkAPI) => {
    try {
      const response = await postLogin(userLogin, password);
      const token = response?.token;

      if (token) {
        localStorage.setItem("bfUserToken", token);

        track(events.loginPage.success);

        client.interceptors.request.use(
          (config) => {
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
          },

          (error) => Promise.reject(error)
        );
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const register = createAsyncThunk(
  "authSlice/register",
  async (registerProps, thunkAPI) => {
    try {
      const {
        utm: {
          data: { utm },
        },
      } = thunkAPI.getState();

      const response = await postRegistration({ ...registerProps, utm });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const logout = createAsyncThunk("authSlice/logout", async () => {
  localStorage.removeItem("bfUserToken");

  window.location.assign(
    `${process.env.PUBLIC_PATH}${process.env.DEFAULT_PAGE}`
  );
});

export const recovery = createAsyncThunk(
  "authSlice/recovery",
  async ({ userLogin }, thunkAPI) => {
    try {
      await postRecovery(userLogin);

      window.location.assign(
        `${process.env.PUBLIC_PATH}auth/check-email?email=${userLogin}`
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const reset = createAsyncThunk(
  "authSlice/reset",
  async ({ newPassword, id }, thunkAPI) => {
    try {
      const response = await postReset(newPassword, id);

      const token = response?.token;

      if (token) {
        localStorage.setItem("bfUserToken", token);

        window.location.assign(
          `${process.env.PUBLIC_PATH}${process.env.DEFAULT_PAGE}`
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const setup = createAsyncThunk(
  "authSlice/setup",
  async ({ password, setupPasswordToken }, thunkAPI) => {
    try {
      const response = await postSetup(password, setupPasswordToken);
      const token = response?.token;

      if (token) {
        localStorage.setItem("bfUserToken", token);

        track(events.createPasswordPage.success);

        client.interceptors.request.use(
          (config) => {
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
          },

          (error) => Promise.reject(error)
        );
        window.location.assign(
          `${process.env.PUBLIC_PATH}${locale}/${process.env.DEFAULT_PAGE}`
        );
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchCountriesAndActivities = createAsyncThunk(
  "authSlice/fetchCountriesAndActivities",
  async () => {
    const response = await getRegistration();

    return response.response;
  }
);

const initialState = {
  data: {
    countries: [],
    isLoggedIn: false,
  },
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.data.isLoggedIn = action.payload;
    },

    resetAction: (state) => {
      state.data.action = undefined;
    },

    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    // login

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;

      const { token } = action.payload;

      if (token) {
        state.data.isLoggedIn = true;
      }
    });
    builder.addCase(login.rejected, onReject);

    // logout

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data = { ...state.data, ...action.payload };
    });
    builder.addCase(logout.rejected, onReject);

    // fetchCountriesAndActivities

    builder.addCase(fetchCountriesAndActivities.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCountriesAndActivities.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data = { ...state.data, ...action.payload };
    });
    builder.addCase(fetchCountriesAndActivities.rejected, onReject);

    // recovery

    builder.addCase(recovery.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(recovery.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data = { ...state.data, ...action.payload };
    });
    builder.addCase(recovery.rejected, onReject);

    // reset

    builder.addCase(reset.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(reset.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(reset.rejected, onReject);

    // register

    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;

      state.data = { ...state.data, ...action.payload };
    });
    builder.addCase(register.rejected, onReject);

    // setup

    builder.addCase(setup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setup.fulfilled, (state, action) => {
      state.isLoading = false;

      const { token } = action.payload;

      if (token) {
        state.data.isLoggedIn = true;

        trackMarketingEvent(marketingEvents.registration.success);
      }
    });
    builder.addCase(setup.rejected, onReject);
  },
});

export const { setIsLoggedIn, resetAction, resetError } = authSlice.actions;

export default authSlice.reducer;
