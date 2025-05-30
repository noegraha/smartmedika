import React from 'react'
import { FormProvider } from './context/FormContext';
import FormInput from './component/FormInput';
import DisplayForm from './component/DisplayForm';
import { Card, Layout } from 'antd';
import DataDisplay from './component/DataDisplay';

const TestReduce = () => {
    return (
        <FormProvider>
            <Layout>
                <div style={{ padding: '20px' }}>
                    <Card
                        title='Contoh Form dengan useReducer + API'
                    >
                        <FormInput />
                        <DisplayForm />
                        <DataDisplay />
                    </Card>
                </div>
            </Layout>
        </FormProvider>
    )
}

export default TestReduce;