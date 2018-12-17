import * as BackAPI from 'resources/backCategoryAPI'


function getAllCategories() {
    return disptach => {
        BackAPI.getAllCategories().then(
            resp => disptach({
                type: 'CATEGORIES_GET_ALL',
                payload: resp
            })
        )
    }
}

export { getAllCategories }



