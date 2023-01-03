import { Button, DataTable, Select, TextField } from '@shopify/polaris';
import React, { useEffect, useState } from 'react'
import SelectComponent from './SelectComponent';
import { Text } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux'
import { btnHandle, showTable } from '../features/SelectSlice';

const DisplayComponent = () => {
    var obj={}, [selected,setSelected]=useState('Baby'), [parentId,setParentId]=useState([]),
    [arr,setArr]=useState([]), [mainData,setMainData]=useState([]),
    [mainSelected,setMainSelected]=useState('brand_name'), [inpVal,setInpVal]=useState(''),
    [loading,setLoading]=useState(false), [msg,setMsg]=useState('')
    const state= useSelector(state=>state.SelectSlice)
    const dispatch=useDispatch()
    
// All categories API fetched in UseEffect

    useEffect(()=>{
        setLoading(true)
        fetch(' https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/',{
            method:'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                appTag: "amazon_sales_channel",
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjkzNTU0NjkwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzMTA2NDgyYmY0ZGIyMTliZDAzMjQwMiJ9.Rxen3O-tlPcm2t1JFRo3pocZh6LL4y1dpYNBHvSggZUImTn6wo82RI-t5WxfNR78bHO8uwL-WrcPWA3CDn58rQhBqwfi0OSQaMGMPBHeiI5E--FWGYQwVJGiAXxRhPhA3LY_YyWdz4O8Ka79BDjwQFX_S8ksPAbMQbFd3M1myOvm4TYa1GHm5IK1wFLtwgLkbAOY8ClgiLB-0fahXusujEMsyLCPLCLVMNiZ0ga2JIl_jotJZwwicDtO0k9FV5OJY0GpXOPC38Zvbft8uzfOa4jrYM_fkOaBCYm_PYT6_nsNKhUcZJbM6LnICKM6hMetbvF-GHYWZv3qlCJjjLZRog",
                "Ced-Source-Id": 500,
                "Ced-Source-Name": "shopify",
                "Ced-Target-Id": 530, 
                "Ced-Target-Name": "amazon"
            },
            body:JSON.stringify({
                target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
                selected: parentId,
                user_id:'63329d7f0451c074aa0e15a8',
                target:{
                    marketplace: "amazon",
                    shopId: "530"
                }
            })
        })
        .then(res => res.json())
        .then(response=>{
            if(response.success){
                arr.push(response.data)
                setArr([...arr])
                setLoading(false)
                setMsg('')
            }
            else{
                setMsg('Something Went Wrong')
                setLoading(false)
            }
        })
        .catch(e=>{
            setLoading(false)
            setMsg('Something Went Wrong')
        })
    },[parentId])

// Attribute API fetched Function

    const getAttributeFunc=(obj)=>{
        mainData=[]
        setMainData([...mainData])
        fetch('https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/',{
            method:'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                appTag: "amazon_sales_channel",
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjkzNTU0NjkwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzMTA2NDgyYmY0ZGIyMTliZDAzMjQwMiJ9.Rxen3O-tlPcm2t1JFRo3pocZh6LL4y1dpYNBHvSggZUImTn6wo82RI-t5WxfNR78bHO8uwL-WrcPWA3CDn58rQhBqwfi0OSQaMGMPBHeiI5E--FWGYQwVJGiAXxRhPhA3LY_YyWdz4O8Ka79BDjwQFX_S8ksPAbMQbFd3M1myOvm4TYa1GHm5IK1wFLtwgLkbAOY8ClgiLB-0fahXusujEMsyLCPLCLVMNiZ0ga2JIl_jotJZwwicDtO0k9FV5OJY0GpXOPC38Zvbft8uzfOa4jrYM_fkOaBCYm_PYT6_nsNKhUcZJbM6LnICKM6hMetbvF-GHYWZv3qlCJjjLZRog",
                "Ced-Source-Id": 500,
                "Ced-Source-Name": "shopify",
                "Ced-Target-Id": 530, 
                "Ced-Target-Name": "amazon"
            },
            body:JSON.stringify({
                target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
                user_id:'63329d7f0451c074aa0e15a8',
                data:{
                    barcode_exemption:false,
                    browser_node_id:obj.browseNodeId,
                    category:obj.category["primary-category"],
                    sub_category:obj.category["sub-category"]
                },
                source:{
                    marketplace: "amazon",
                    shopId: "530"
                },
                target:{
                    marketplace: "amazon",
                    shopId: "530"
                }
            })
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.success){
            mainData.push(response.data.Mandantory)
            setMainData([...mainData])
            setLoading(false)
            }
            else{
                setLoading(false)
                setMsg('something went wrong')
            }
        })
        .catch(e=>{
            setLoading(false)
            setMsg('Something went wrong')
        })
    }

// ChangeHandler Function

    const handleSelectChange=(e,index)=>{
        dispatch(showTable([]))
        setInpVal('')
        if( JSON.parse(e).hasChildren==true){
            setMainData([])
            setSelected(e)
            setParentId(JSON.parse(e).id)
            arr.splice(index,(arr.length-index-1))
        }
        else{
            setLoading(true)
            arr.map((item)=>{
                item.map((item1)=>{
                    if(item1.name==JSON.parse(e).label){
                        obj={browseNodeId:item1.browseNodeId,category:item1.category}  
                    }
                })
            })
            getAttributeFunc(obj)
        }
    }

// BtnHandler Function

    const btnHandler=()=>{
        var obj=[mainSelected,inpVal]
        dispatch(btnHandle(obj))
    }

  return (
    <div className=' category '>
        <Text  variant="heading4xl" as="h1">Fetching Categories Data</Text>
        {arr.map((x,i)=>{  
            return <SelectComponent index={i} label='Main Category' options={x.map((item)=>{
                return {label:item.name,value:JSON.stringify({label:item.name,id:item.parent_id,hasChildren:item.hasChildren})}    })} value={selected}  handleSelectChange={handleSelectChange}/>
            })
        } 
        {mainData.length>0?
        <div className=' category border '>
            <Text  variant="heading4xl" as="h1">Attribute data</Text>  
            {mainData.map((item)=>{
                return <Select label='Attributes' options={Object.keys(item).map((x)=>{
                    return {label:x,value:x} })} value={mainSelected} onChange={(e)=>{setMainSelected(e)}}/>
                })
            }
            <TextField label='Enter Attribute value' value={inpVal} onChange={(e)=>{setInpVal(e)}} />
            <Button onClick={btnHandler} value={inpVal} sel={mainSelected} primary>Add Attributes</Button>
        </div>
        :<p></p>} 
        {msg!=''?<p style={{color:'red',marginTop:'20px',fontSize:'20px'}}>{msg}</p>:<p></p>}
        {loading? <img src='https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif' style={{height:'50px',width:'50px',marginTop:'40px'}} alt=''/>:<p></p>}
        {state.tableArr.length>0?
        <div className=' category attr_table border '>
            <Text  variant="heading4xl" as="h1">Attribute Table</Text> 
            <DataTable columnContentTypes={['text','text',]} headings={['Attribute Name','Attribute Value']} rows={state.tableArr}/>
        </div>
        :<p></p>}
    </div>
  )
}

export default DisplayComponent