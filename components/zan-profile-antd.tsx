"use client";
import { message, Form, Input, ConfigProvider, Row, Button, Card } from 'antd';
import React, { useState } from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// import styles from './zan-profile-antd.module.css';
import { useActions, useUIState } from 'ai/rsc';
import { AI } from '@/app/action';

const FormSchema = z.object({
    firstName: z.string().min(2, {
      message: "must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "must be ast least 2 characters",
    }),
  })

type Props = z.infer<typeof FormSchema>;

const { Item } = Form;

const zanTheme = {
  token: {
    colorPrimary: '#8442ff',
    colorInfo: '#8442ff',
  },
  components: {
    Button: {
      borderRadius: 10,
      borderRadiusSM: 8,
      controlHeight: 44,
      marginXS: 8,
      paddingContentHorizontal: 24,
      fontSizeLG: 18,
      controlHeightLG: 52,
      controlHeightSM: 36,
      paddingXS: 16,
      borderRadiusLG: 10,
    },
    Form: {
      controlHeight: 44,
      marginLG: 24,
      margin: 16,
      paddingSM: 16,
      controlHeightLG: 52,
      controlHeightSM: 36,
    },
    Input: {
      controlHeight: 44,
      borderRadius: 10,
      fontSizeIcon: 16,
      borderRadiusLG: 10,
      controlPaddingHorizontal: 12,
      paddingSM: 16,
      colorBgContainer: '#F6F6FF',
      colorBgContainerDisabled: 'rgba(0, 0, 0, 0.04)',
      colorBorder: 'rgba(0, 0, 0, 0)',
      colorFillAlter: '#F6F6FF',
      controlHeightLG: 52,
      borderRadiusSM: 8,
      controlHeightSM: 36,
    },
  },
};

export function ZanProfileAntd(props: Props): React.ReactNode {
  const {
    confirmProfileUpdate,
  } = useActions();
  console.info('props', props);
  

  const [updatingUI, setUpdatingUI] = useState<null | React.ReactNode>(
    null,
  );
  const [, setMessages] = useUIState<typeof AI>();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.info('submit data', data);
    const response = await confirmProfileUpdate(data.firstName, data.lastName);
    setUpdatingUI(response.updatingUI);

     // Insert a new system message to the UI.
     setMessages((currentMessages: any) => [
      ...currentMessages,
      response.newMessage,
    ]);
  }

  if (updatingUI) {
    return updatingUI;
  }

  return (
    <>
        <ConfigProvider theme={zanTheme}>
        <Card title="My Zan Profile" bordered={false}>
          <Form
            layout="vertical"
            initialValues={{...props}}
            onFinish={onSubmit}
          >
            <Item
              name={['firstName']}
              label="Your first name"
            >
              <Input placeholder='antd' />
            </Item>
            <Item
              name={['lastName']}
              label="Your last name"
            >
              <Input placeholder='antd' />
            </Item>
            <Row>
              <div style={{ flex: 'auto' }}/>
              <Button type="primary" htmlType='submit'>Confirm</Button>
            </Row>
          </Form>
        </Card>
          
        </ConfigProvider>
    </>
  );
};
