import PageHeader from "../../components/pageitems/PageHeader";
import PageContent from "../../components/pageitems/PageContent";
import React from "react";
import {Garden} from "../Gardens/SingleGarden";
import {Plant} from "./Plants";
import {PlantsDataContextProvider} from "../../context/PlantsDataContext";

export function SinglePlant() {
    return <>
        <PageHeader title='Mengelmoestuintjes'/>
        <PageContent>
            <PlantsDataContextProvider>
                <Plant/>
            </PlantsDataContextProvider>
        </PageContent>
    </>
}