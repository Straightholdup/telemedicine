import React, {useEffect, useState} from "react";
import {DoctorTypesList, DoctorTypesWrapper} from "./styled";
import {DoctorTypesItem} from "../DoctorTypesItem";
import {CategoriesTitle} from "../Categories/styled";
import {API_URL} from "../../variables";
import {showErrorMessage} from "../Notification/TriggerNotification";
import ReactPaginate from "react-paginate";

export const DoctorTypes = () => {
    const [doctorSpecialization, setDoctorSpecialization] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;
    const currentPageData = doctorSpecialization.slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(doctorSpecialization.length / PER_PAGE);

    const getSpecialization = () => {
        fetch(`${API_URL}/specializations/`)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Специализации не получены!")
                }
                return response.json();
            })
            .then(data => {
                setDoctorSpecialization(data);
            })
            .catch(err => {
                showErrorMessage(err.toString().replace("Error:",""));
            })
    }



    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    useEffect(() => {
        getSpecialization();
    },[])

    return(
        <DoctorTypesWrapper>
            <CategoriesTitle>А так же вы можете выбрать специальность врача напрямую</CategoriesTitle>
            <DoctorTypesList>
                {
                    currentPageData?.map((item, index) => (
                        <>
                            <DoctorTypesItem doctorItem={item} index={index} key={index}/>
                        </>

                    ))
                }
            </DoctorTypesList>
            <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
        </DoctorTypesWrapper>
    )
};