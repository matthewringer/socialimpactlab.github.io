port module Dash exposing (..)

import String
import Html exposing (..)
import Html.App as Html
import Html.Attributes exposing (..)
import Html.Events exposing (..) 
import List.Extra

 



--MAIN
main : Program Never
main =
  Html.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

--MODEL
type alias Model = 
    { charts : List Chart
    , selected_district : Maybe String
    , selected_tahasil : Maybe String
    , loading_status : String
    , csv_url : String
    }

type alias Chart = 
    { circle_code : Int
    , villages_identified : Int
    , households_identified : Int 
    , villages_pattas_distributed : Int
    , households_pattas_distributed : Int
    , circle : String
    , tahasil : String
    , district : String
    , ri_name : String
    , ri_number : String
    , tahasildar_name : String
    , tahasildar_number : String
    }

type alias Row = 
    { circle_code : String
    , villages_identified : String
    , households_identified : String
    , villages_pattas_distributed : String
    , households_pattas_distributed : String
    , circle : String
    , tahasil : String
    , district : String
    , ri_name : String
    , ri_number : String
    , tahasildar_name : String
    , tahasildar_number : String
    }


--UPDATE
type Msg 
    = Update
    | AddCharts (List Row)
    | ChangeStatus String
    | UpdateDistrict String
    | UpdateTahasil String
    | ChangeUrl String

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        Update ->
            (model, Cmd.none)
        AddCharts rows -> 
            let newCharts =
                rowFormat rows
            in
                ({model | charts = newCharts}, Cmd.batch((batchHelper newCharts)++(districtAggregateHelper newCharts)++(buildTahasils newCharts)))

        ChangeStatus status ->
            ({model | loading_status = status}, Cmd.none)
        
        UpdateDistrict district -> 
            let 
                newDistrict = stringToMaybe district 
                newModel = { model | selected_district = newDistrict, selected_tahasil = Nothing}
            in
                ( newModel, filterHelper newModel )
       
        UpdateTahasil tahasil -> 
            let  
                newTahasil = stringToMaybe tahasil 
                newModel = {model | selected_tahasil = newTahasil}
            in
                (newModel, filterHelper newModel)
        
        ChangeUrl url ->
            ({model | csv_url = url}, Cmd.none)

filterHelper : Model -> Cmd Msg
filterHelper model = 
    case model.selected_district of
        Just district ->
            case model.selected_tahasil of
                Just tahasil ->
                   filter_tahasil (district, tahasil)
                Nothing ->
                   filter_district (district)
        Nothing ->
            filter_none 0


--top-level aggregation
superAggregateHelper : List Chart -> Cmd Msg
superAggregateHelper charts =
    let
        numbers = 
            List.map getNumbers charts
        unzipped =
            List.unzip numbers
        (households, pattas) =
            doubleReduce unzipped
    in
      build_super (0, households, pattas, "Odisha")
      

--helper functions
doubleReduce : (List Int, List Int) -> (Int, Int)
doubleReduce (first, second) =
    (List.sum first, List.sum second)

getNumbers : Chart -> (Int, Int)
getNumbers chart = 
    (chart.households_identified, chart.households_pattas_distributed)

--district-level aggregation
districtAggregateHelper : List Chart -> List (Cmd Msg)
districtAggregateHelper charts =
    let
        districts = 
            getDistricts charts
        
    in
      List.map (getAggregateDistrict charts) districts

getAggregateDistrict : List Chart -> String -> Cmd Msg
getAggregateDistrict charts district =
    let
        filtered = 
            List.filter (isDistrict district) charts
        numbers = 
            List.map getNumbers filtered
        unzipped =
            List.unzip numbers
        (households, pattas) =
            doubleReduce unzipped
    in
        build_district (district, households, pattas, district)


--tahasil-level aggregation
--tahasilAggregateHelper : List Chart -> List (Cmd Msg)
--tahasilAggregateHelper charts =
--   let

buildTahasils : List Chart -> List (Cmd Msg)
buildTahasils charts =
    let tuples = 
        getTahasilTuples charts
    in
        List.map (getAggregateTahasil charts) tuples

getAggregateTahasil : List Chart -> (String, String) -> Cmd Msg
getAggregateTahasil charts (district, tahasil) = 
    let
        filtered = 
            List.filter (isTahasil (district, tahasil)) charts
        (tahasildar_name, tahasildar_number) = 
            getTahasildar (List.head filtered)
        numbers = 
            List.map getNumbers filtered
        unzipped =
            List.unzip numbers
        (households, pattas) =
            doubleReduce unzipped
    in
        build_tahasil (tahasil, households, pattas, tahasil, district, tahasildar_name, tahasildar_number)

getTahasildar : Maybe Chart -> (String, String)
getTahasildar chart = 
        case chart of
            Just chart ->
                (chart.tahasildar_name, chart.tahasildar_number)
            Nothing -> 
                ("", "")

getTahasilTuples : List Chart -> List (String, String)  
getTahasilTuples charts= 
    let 
        tahasils =
        List.map getTahasilTuple charts
    in 
        List.Extra.unique tahasils

getTahasilTuple : Chart -> (String, String)
getTahasilTuple chart = 
    (chart.district, chart.tahasil)


isTahasil : (String, String) -> Chart -> Bool
isTahasil (district, tahasil) chart =
   (chart.tahasil == tahasil) && (chart.district == district)

stringToMaybe : String -> Maybe String 
stringToMaybe string = 
    if string == " " then
        Nothing
    else
        Just string

batchHelper : List Chart -> List (Cmd Msg)
batchHelper charts =
    List.map onceHelper charts

onceHelper : Chart -> Cmd Msg
onceHelper chart = 
   build_circle (buildChartHelp chart)


showHideHelper : Model -> List (Cmd Msg)
showHideHelper model = 
    List.map (showOrHide model.selected_district model.selected_tahasil) model.charts

showOrHide : Maybe String -> Maybe String -> Chart -> Cmd Msg
showOrHide district tahasil chart =
    case district of
        Just district ->
            case tahasil of
                Just tahasil ->
                    if (chart.tahasil == tahasil) && (chart.district == district) then
                        show chart.circle_code
                    else
                        hide chart.circle_code
                Nothing ->
                    if (chart.district == district) then
                        show chart.circle_code
                    else
                        hide chart.circle_code
        Nothing ->
            hide chart.circle_code



buildChartHelp : Chart -> (Int, Int, Int, String, String, String, String, String)
buildChartHelp chart = 
    (chart.circle_code, chart.households_identified, chart.households_pattas_distributed, chart.circle, chart.district, chart.tahasil, chart.ri_name, chart.ri_number)


rowFormat : List Row -> List Chart
rowFormat rows = 
    List.map rowFormatHelp rows

rowFormatHelp : Row -> Chart
rowFormatHelp row =
    { row |
      circle_code = Result.withDefault 0 (String.toInt row.circle_code)
    , villages_identified = Result.withDefault 0 (String.toInt row.villages_identified)
    , households_identified =  Result.withDefault 0 (String.toInt row.households_identified)
    , villages_pattas_distributed = Result.withDefault 0 (String.toInt row.villages_pattas_distributed)
    , households_pattas_distributed = Result.withDefault 0 (String.toInt row.households_pattas_distributed)
    }

--VIEW

view : Model -> Html Msg
view model = 
    div [id "container"][
        viewSelector model
        , viewSuper
        , viewDistricts
        , viewTahasils
        , viewCircles
    ]
   
viewSelector : Model -> Html Msg
viewSelector model =
    div [id "selector"]
    [   div[][text model.loading_status]
    ,   div[][a [downloadAs "data.csv", href model.csv_url][text "Export data"]]
    ,   select[onInput UpdateDistrict]([(option[value " "][text("All districts")])]++List.map optionMaker (getDistricts model.charts))
    ,   tahasilSelect model
    ]

viewSuper : Html Msg
viewSuper = 
    div [id "super"][

    ]

viewDistricts : Html Msg
viewDistricts = 
    div[]
    [   h1[][text "Districts"]
        , div [id "district_container"][]
    ]
    


viewTahasils : Html Msg
viewTahasils = 
    div[]
    [   h1[][text "Tahasils"]
        , div [id "tahasil_container"][]
    ]

viewCircles : Html Msg
viewCircles = 
    div[]
    [   h1[][text "Circles"]
        , div [id "circle_container"][]
    ]


optionMaker : String -> Html Msg
optionMaker string = 
    option [value string][text string]

getDistricts : List Chart -> List String  
getDistricts charts = 
    let districts = 
        List.map getDistrict charts
    in 
        List.Extra.unique districts

getDistrict : Chart -> String
getDistrict chart = 
    chart.district


tahasilSelect : Model -> Html Msg
tahasilSelect model =
    case model.selected_district of
        Just selected_district ->
             select[onInput UpdateTahasil]([(option[value " "][text("All tahasils")])]++List.map optionMaker (getTahasils model.charts selected_district))
        Nothing ->
            text ""

getTahasils : List Chart -> String -> List String  
getTahasils charts district= 
    let 
        filtered = 
        List.filter (isDistrict district) charts 

        tahasils =
        List.map getTahasil filtered
    in 
        List.Extra.unique tahasils

getTahasil : Chart -> String
getTahasil chart = 
    chart.tahasil

isDistrict : String -> Chart -> Bool
isDistrict selected chart =
    chart.district == selected

view_chart : Chart -> Html Msg
view_chart chart =
    div[style [("height", "150")], id (toString(chart.circle_code))][text ""]

--SUBSCRIPTIONS
subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.batch([charts AddCharts, status ChangeStatus, download_url ChangeUrl])

port charts : (List Row -> msg) -> Sub msg
port status : (String -> msg) -> Sub msg
port download_url : (String -> msg) -> Sub msg

--PORTS
port build_circle : (Int, Int, Int, String, String, String, String, String) -> Cmd msg
port build_super : (Int, Int, Int, String) -> Cmd msg
port build_district : (String, Int, Int, String) -> Cmd msg 
port build_tahasil : (String, Int, Int, String, String, String, String) -> Cmd msg

port show : Int -> Cmd msg
port hide : Int -> Cmd msg

port filter_tahasil : (String, String) -> Cmd msg
port filter_district : String -> Cmd msg
port filter_none : Int -> Cmd msg

port update_chart : (Int, Int, Int, String) -> Cmd msg
port update_super : (Int, Int, String) -> Cmd msg

port hide_district : String -> Cmd msg
port show_district : String -> Cmd msg
port hide_tahasil : String -> Cmd msg
port show_tahasil : String -> Cmd msg

port export_csv : (List Chart) -> Cmd msg


--INIT
init : (Model, Cmd Msg)
init = 
    (Model [] Nothing Nothing "Requesting Data..." "", Cmd.none)


