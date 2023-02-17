import styled from "styled-components";

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  align-self: center;
  justify-content: center;
  height: 100vh;
`;

export const ErrorText = styled.div`
  color: #cc0033;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 23px;
  font-weight: bold;
  line-height: 20px;
  text-shadow: 1px 1px rgba(250, 250, 250, 0.3);
`;

export const GlobalStyle = styled.div`
  font-family: system-ui, /* macOS 10.11-10.12 */ -apple-system,
    /* Windows 6+ */ "Segoe UI", /* Android 4+ */ "Roboto",
    /* Ubuntu 10.10+ */ "Ubuntu", /* Gnome 3+ */ "Cantarell",
    /* KDE Plasma 5+ */ "Noto Sans", /* fallback */ sans-serif,
    /* macOS emoji */ "Apple Color Emoji", /* Windows emoji */ "Segoe UI Emoji",
    /* Windows emoji */ "Segoe UI Symbol", /* Linux emoji */ "Noto Color Emoji" !important;

  & > * {
    font-family: system-ui, /* macOS 10.11-10.12 */ -apple-system,
      /* Windows 6+ */ "Segoe UI", /* Android 4+ */ "Roboto",
      /* Ubuntu 10.10+ */ "Ubuntu", /* Gnome 3+ */ "Cantarell",
      /* KDE Plasma 5+ */ "Noto Sans", /* fallback */ sans-serif,
      /* macOS emoji */ "Apple Color Emoji",
      /* Windows emoji */ "Segoe UI Emoji",
      /* Windows emoji */ "Segoe UI Symbol",
      /* Linux emoji */ "Noto Color Emoji" !important;
  }
`;
