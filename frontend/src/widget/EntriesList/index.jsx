import React from "react";
import {SizeEntryZero} from "../SizeEntryZero";
import {WaitStatus} from "../../app/styles/icons/waitStatus";
import {SuccessStatus} from "../../app/styles/icons/successStatus";
import dayjs from "dayjs";
import {Loader} from "../Loader";
import {Data, EntryItem, EntryItemWrapper, StatusBar, StatusWrapper, Link, SystemsTitle} from "../Profile/styled";
import {useSelector} from "react-redux";

export const EntriesList = ({orders, showLoader, type}) => {

    const expression = type === "future" ? <>предстоит <WaitStatus/></> : <>прошла <SuccessStatus/></>
    const isDoctor = useSelector(state => state.categories.loginType)
    const isDoctorExpression = !isDoctor ? "Доктора" : "Пациента"

    return (
        <div style={{minHeight: "450px"}}>
            {
                orders.length === 0
                    ? <SizeEntryZero type={type}/>
                    : !showLoader ?
                        orders?.map((item, index) => (
                                <EntryItemWrapper key={index}>
                                    <EntryItem>
                                        <h2>
                                            <SystemsTitle>ID записи: </SystemsTitle>
                                            <Data>#{item.id}</Data>
                                        </h2>
                                        <h4>
                                            <SystemsTitle>Имя {isDoctorExpression}: </SystemsTitle>
                                            <Data>{item.name}</Data>
                                        </h4>
                                        <h4>
                                            <SystemsTitle>Ссылка на встречу: </SystemsTitle>
                                            <Link target="_blank" href={item.meeting_url}>Ссылка</Link>
                                        </h4>
                                    </EntryItem>
                                    <EntryItem>
                                       <StatusWrapper>
                                           <SystemsTitle>Статус записи: </SystemsTitle>
                                            <StatusBar>
                                                {expression}
                                            </StatusBar>
                                        </StatusWrapper>
                                        <h4>
                                            <SystemsTitle>Стоимость консультации:</SystemsTitle>
                                            <Data>{item.price} тг.</Data>
                                        </h4>
                                        <h4>
                                            <SystemsTitle>Время консултации: </SystemsTitle>
                                                <Data>{dayjs(item.order_time).format("DD-MM-YYYY H:mm")}</Data>
                                        </h4>
                                    </EntryItem>
                                </EntryItemWrapper>
                            )
                        )
                        : <Loader/>

            }
        </div>
    )
}