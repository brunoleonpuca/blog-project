import { useState } from 'react';
import styled from 'styled-components';
import PageLayout from '../components/layout/page-layout';
import Button from '../components/common/button';

const SettingsForm = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing.xl};
  max-width: 600px;
`;

const SettingsSection = styled.section`
  display: grid;
  gap: ${props => props.theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.typography.platform.title};
  color: ${props => props.theme.colors.platform.header};
  font-size: 1.25rem;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FormGroup = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.platform.border};
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Toggle = styled.label`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
`;

const ToggleInput = styled.input`
  appearance: none;
  width: 40px;
  height: 20px;
  background: ${props => props.checked ? props.theme.colors.primary : props.theme.colors.platform.border};
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${props => props.checked ? '22px' : '2px'};
    transition: left 0.2s ease;
  }
`;

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: 'My Blog Platform',
    siteDescription: 'A place for sharing knowledge',
    enableComments: true,
    enableNewsletter: true,
    postsPerPage: 10
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings update
    console.log('Settings updated:', settings);
  };

  return (
    <PageLayout
      title="Settings"
      description="Configure your blog platform settings"
    >
      <SettingsForm onSubmit={handleSubmit}>
        <SettingsSection>
          <SectionTitle>General Settings</SectionTitle>
          <FormGroup>
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={e => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="siteDescription">Site Description</Label>
            <Input
              id="siteDescription"
              value={settings.siteDescription}
              onChange={e => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
            />
          </FormGroup>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>Feature Settings</SectionTitle>
          <Toggle>
            <ToggleInput
              type="checkbox"
              checked={settings.enableComments}
              onChange={e => setSettings(prev => ({ ...prev, enableComments: e.target.checked }))}
            />
            Enable Comments
          </Toggle>
          <Toggle>
            <ToggleInput
              type="checkbox"
              checked={settings.enableNewsletter}
              onChange={e => setSettings(prev => ({ ...prev, enableNewsletter: e.target.checked }))}
            />
            Enable Newsletter
          </Toggle>
        </SettingsSection>

        <Button type="submit">Save Settings</Button>
      </SettingsForm>
    </PageLayout>
  );
};

export default SettingsPage;