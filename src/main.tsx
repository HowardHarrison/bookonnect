import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import authReducer from './state'
import modeReducer from './state/mode'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { bookApi } from 'state/bookAPI'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

const rootReducer = combineReducers({ auth: authReducer, mode: modeReducer, [bookApi.reducerPath]: bookApi.reducer, });
const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(bookApi.middleware),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000000000,

            style: {
              background: "#363636",
              color: "#fff",
              fontFamily: "Roboto",
            },

            success: {
              duration: 3000,
              iconTheme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <App />
          </PersistGate>
        </Provider>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;