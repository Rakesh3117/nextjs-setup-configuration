'use client';

import { useState, useSyncExternalStore } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Stack,
  Card,
  Divider,
  Alert,
} from '@mui/material';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

import { colors } from '@/lib/theme/mui/colors';
import { spacing } from '@/lib/theme/mui/spacing';
import { api } from '@/services/api/api';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot(): string | null {
  return api.getToken();
}

function getServerSnapshot(): string | null {
  return null;
}

export default function Home() {
  const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [apiFeedback, setApiFeedback] = useState<string | null>(null);

  const handleSetMockToken = () => {
    const mockToken = `demo_jwt_${Date.now()}`;
    api.setToken(mockToken);
    window.dispatchEvent(new Event('storage'));
    setApiFeedback(`Token stored in localStorage: Bearer ${mockToken}`);
  };

  const handleClearToken = () => {
    api.removeToken();
    window.dispatchEvent(new Event('storage'));
    setApiFeedback('Token cleared from localStorage.');
  };

  const paletteGroups = [
    {
      label: 'Primary',
      color: colors.primary.default,
      light: colors.primary.light,
      dark: colors.primary.dark,
    },
    {
      label: 'Secondary',
      color: colors.secondary.default,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
    },
    {
      label: 'Success',
      color: colors.success.default,
      light: colors.success.light,
      dark: colors.success.dark,
    },
    { label: 'Info', color: colors.info.default, light: colors.info.light, dark: colors.info.dark },
    {
      label: 'Warning',
      color: colors.warning.default,
      light: colors.warning.light,
      dark: colors.warning.dark,
    },
    {
      label: 'Danger',
      color: colors.danger.default,
      light: colors.danger.light,
      dark: colors.danger.dark,
    },
  ];

  const spacingMultipliers = [1, 2, 3, 4];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: colors.background.light,
        py: spacing, // 8px * 8 = 64px
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 3,
            backgroundColor: colors.surface.default,
            border: `1px solid ${colors.border.default}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
            }}
          >
            <Box>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  color: colors.text.primary,
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                }}
              >
                Setup & Theme Verification
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: colors.text.secondary,
                  mt: 0.5,
                }}
              >
                Demonstrating design tokens, colors, spacing ({spacing}px base unit), and the
                centralized API client.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              <Chip
                icon={<CheckCircleOutlinedIcon />}
                label="Theme Active"
                size="small"
                sx={{
                  backgroundColor: `${colors.success.default}15`,
                  color: colors.success.default,
                  fontWeight: 600,
                }}
              />
              <Chip
                label={`Spacing: ${spacing}px`}
                size="small"
                sx={{
                  backgroundColor: `${colors.primary.default}15`,
                  color: colors.primary.default,
                  fontWeight: 600,
                }}
              />
            </Stack>
          </Stack>
        </Paper>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
            gap: 3,
          }}
        >
          {/* Left Column: Theme Colors & Spacing */}
          <Stack spacing={3}>
            {/* Color Tokens Card */}
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: `1px solid ${colors.border.default}`,
                backgroundColor: colors.surface.default,
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2.5 }}>
                <PaletteOutlinedIcon sx={{ color: colors.primary.default }} />
                <Typography variant="h3" sx={{ fontSize: '1.25rem', color: colors.text.primary }}>
                  Theme Colors (colors.ts)
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 3 }}>
                Color palette tokens defined in <code>src/lib/theme/mui/colors.ts</code>
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
                  gap: 2,
                }}
              >
                {paletteGroups.map((group) => (
                  <Paper
                    key={group.label}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${colors.border.light}`,
                      backgroundColor: colors.surface.light,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 48,
                        borderRadius: 1.5,
                        backgroundColor: group.color,
                        mb: 1.5,
                        boxShadow: `0 4px 10px ${group.color}40`,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: colors.text.primary }}
                    >
                      {group.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: colors.text.secondary, fontFamily: 'monospace' }}
                    >
                      {group.color}
                    </Typography>
                    <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                      <Box
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 0.5,
                          backgroundColor: group.light,
                        }}
                        title="Light shade"
                      />
                      <Box
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 0.5,
                          backgroundColor: group.color,
                        }}
                        title="Default shade"
                      />
                      <Box
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 0.5,
                          backgroundColor: group.dark,
                        }}
                        title="Dark shade"
                      />
                    </Stack>
                  </Paper>
                ))}
              </Box>
            </Card>

            {/* Spacing Tokens Card */}
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: `1px solid ${colors.border.default}`,
                backgroundColor: colors.surface.default,
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontSize: '1.25rem', color: colors.text.primary, mb: 1 }}
              >
                Spacing System (spacing.ts)
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 3 }}>
                Base grid unit is <code>{spacing}px</code> (configured in{' '}
                <code>src/lib/theme/mui/spacing.ts</code>)
              </Typography>

              <Stack spacing={2}>
                {spacingMultipliers.map((mult) => {
                  const pixelValue = spacing * mult;
                  return (
                    <Box key={mult}>
                      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 600, color: colors.text.primary }}
                        >
                          spacing * {mult} ({mult * 8}px / {mult} unit)
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: colors.text.secondary, fontFamily: 'monospace' }}
                        >
                          {pixelValue}px
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          height: 12,
                          width: `${mult * 25}%`,
                          minWidth: `${pixelValue * 2}px`,
                          maxWidth: '100%',
                          borderRadius: 1,
                          backgroundColor: colors.primary.light,
                          background: `linear-gradient(90deg, ${colors.primary.default}, ${colors.primary.light})`,
                        }}
                      />
                    </Box>
                  );
                })}
              </Stack>
            </Card>
          </Stack>

          {/* Right Column: Centralized API Verification */}
          <Stack spacing={3}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: `1px solid ${colors.border.default}`,
                backgroundColor: colors.surface.default,
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2.5 }}>
                <ApiOutlinedIcon sx={{ color: colors.info.default }} />
                <Typography variant="h3" sx={{ fontSize: '1.25rem', color: colors.text.primary }}>
                  Centralized API Client
                </Typography>
              </Stack>

              <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 2.5 }}>
                Verifies <code>src/services/api/api.ts</code> integration with{' '}
                <code>localStorage</code> authorization.
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2.5,
                  borderRadius: 2,
                  backgroundColor: colors.surface.light,
                  border: `1px solid ${colors.border.light}`,
                }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                  <VpnKeyOutlinedIcon sx={{ fontSize: 18, color: colors.gray.default }} />
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 600, color: colors.text.primary }}
                  >
                    Authorization Header Status
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    wordBreak: 'break-all',
                    color: token ? colors.success.default : colors.text.disabled,
                  }}
                >
                  {token ? `Bearer ${token}` : '(No token found in localStorage)'}
                </Typography>
              </Paper>

              <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSetMockToken}
                  sx={{
                    backgroundColor: colors.primary.default,
                    '&:hover': { backgroundColor: colors.primary.dark },
                  }}
                >
                  Set Mock Token
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleClearToken}
                  disabled={!token}
                  sx={{
                    color: colors.danger.default,
                    borderColor: colors.danger.light,
                    '&:hover': {
                      borderColor: colors.danger.default,
                      backgroundColor: `${colors.danger.default}08`,
                    },
                  }}
                >
                  Clear Token
                </Button>
              </Stack>

              {apiFeedback && (
                <Alert
                  severity={token ? 'success' : 'info'}
                  sx={{ mb: 2, borderRadius: 2 }}
                  onClose={() => setApiFeedback(null)}
                >
                  {apiFeedback}
                </Alert>
              )}

              <Divider sx={{ my: 2.5, borderColor: colors.divider.default }} />

              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: colors.text.primary, mb: 1 }}
              >
                Usage Example:
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  borderRadius: 1.5,
                  backgroundColor: colors.background.dark,
                  color: colors.white.default,
                  fontFamily: 'monospace',
                  fontSize: '0.8125rem',
                  overflowX: 'auto',
                }}
              >
                <pre style={{ margin: 0 }}>
                  {`// 1. GET with query params
const users = await api.get(
  '/users',
  { page: 1, limit: 10 }
);

// 2. POST with payload
const newUser = await api.post(
  '/users',
  { name: 'John Doe' }
);`}
                </pre>
              </Paper>
            </Card>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
